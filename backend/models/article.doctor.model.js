import mongoose from "mongoose";

const doctorArticleSchema = new mongoose.Schema({
    author: {type:mongoose.Schema.Types.ObjectId, ref: "User",required: true},
    image: {type: String, required: true},
    title: { type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

const DoctorArticle = mongoose.model('DoctorArticle', doctorArticleSchema)

export default DoctorArticle