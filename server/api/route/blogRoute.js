import blogController from "../controller/blogController.js";
import authMiddleware from "../../helpers/auth.js";
const { verifyToken } = authMiddleware;
const {
  createBlog,
  getBlogList,
  getBlogById,
  editBlog,
  deleteBlog,
} = blogController;

import express from "express";
const router = express.Router();

router.post("/createBlog",verifyToken, createBlog);
router.get("/getBlogList", getBlogList);
router.get("/getBlogById", getBlogById);
router.put("/editBlog", verifyToken, editBlog);
router.put("/deleteBlog", verifyToken, deleteBlog);

export default router;
