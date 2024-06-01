import DoctorArticle from "../models/article.doctor.model";

export const addArticle = async (req, res) => {
  try {
    const { title, image, content } = req.query;
    const { id: author } = req.params;

    const newArticle = await new DoctorArticle({
      author,
      title,
      image,
      content,
    });

    if (newArticle) {
      await newArticle.save();
      res.status(201).json({
        author: newArticle.author,
        title: newArticle.title,
        image: newArticle.image,
        content: newArticle.content,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    console.log("Error in article controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
