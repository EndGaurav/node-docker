const express = require("express")
const postController = require("../controllers/postController");
const protect = require("../middleware/authmiddleware");

const router = express.Router()

router
    .route("/")
    .get(protect, postController.getAllPost)
    .post(protect, postController.createPost);

router
    .route("/:id").put(protect, postController.updatePost)
    .delete(protect, postController.deletePost)
    .get(protect, postController.getOnePost);

module.exports = router;