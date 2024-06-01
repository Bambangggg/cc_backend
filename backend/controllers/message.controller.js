import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, senderId, receiverId } = req.body;

    if (!senderId) {
      return console.log("user not found");
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY WILL GO HERE
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { receiverId, senderId } = req.query;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessagesByDate = async (req, res) => {
  try {
    const { date } = req.params;

    // Pastikan tanggal diformat dengan benar
    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0); // Set start time to the beginning of the day
    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999); // Set end time to the end of the day

    // Dapatkan waktu 2 jam yang lalu dari sekarang
    const twoHoursAgo = new Date();
    twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

    const messages = await Message.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      }
    })
    .populate('senderId')
    .populate({
      path: 'receiverId',
      match: { roles: 'Doctor' }, // Hanya match dengan pengguna yang memiliki peran "Doctor"
      select: 'username email'
    })
    .exec();

    // Filter pesan yang tidak memiliki receiverId yang cocok dengan Doctor
    const filteredMessages = messages.filter(message => message.receiverId);

    res.status(200).json(filteredMessages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages', error });
  }
};