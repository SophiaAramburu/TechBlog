// Imports Express, Blog Model, and withAuth helper function
const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "text", "created_at", "user_id", "post_id"],
          include: { model: User, attributes: ["username"] },
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates new blog with given request body
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Edits blog existing blog post by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.update(
      { title: req.body.title, content: req.body.content },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "content", "created_at"],
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          attributes: ["id", "text", "post_id", "user_id", "created_at"],
          include: { model: User, attributes: ["username"] },
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes Existing blog post by ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;