import User from "../models/user.model.js";
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const listdoctor = await User.find({ roles: "Doctor" });
    if (!listdoctor) {
      console.log("error");
      return res.status(404).json({ error: "Doctors not found" });
    }
    res.status(200).json(listdoctor);
  } catch (error) {
    console.error("Error in doctor controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const listpatient = await User.find({ roles: "Patient" });
    if (!listpatient) {
      console.log("error");
      return res.status(404).json({ error: "Doctors not found" });
    }
    res.status(200).json(listpatient);
  } catch (error) {
    console.error("Error in doctor controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getChatDoctor = async (req, res) => {
  try {
    const _id = req.query._id;
    const doctor = await User.findOne({ _id });
    if (doctor) {
      return res.status(200).json(doctor);
    } else {
      console.log("Couldn't find doctor");
      return res.status(404).json({ error: "Doctor Not Found!" });
    }
  } catch (error) {
    console.error("Error in doctor controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
