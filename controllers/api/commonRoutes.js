const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Gets all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({});
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets comment by ID
router.get("/:id", async (req, res) => {
  try {
    const postComments = await Comment.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(postComments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Posts new comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edits comment by ID
router.put("/:id", withAuth, async (req, res) => {
  try {
    const editComment = await Comment.update(
      {
        text: req.body.text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(editComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes Comment by ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: "No Comment found with this ID!" });
    }
    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;