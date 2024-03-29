import express from "express";
import { signupUser, loginUser, getProfile, editProfile } from "../controller/user_controller.js";
import { uploadImage, getImage } from "../controller/image-controller.js";
import upload from "../utils/upload.js";
import { createPost, getAllPosts, getPost, updatePost, deletePost } from "../controller/post-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import { addComment, getAllComments, deleteComment } from "../controller/comment-controller.js";
import { contactUs } from "../controller/contact-controller.js";

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);
router.post('/comment/add', authenticateToken, addComment);
router.get('/comment/:id', authenticateToken, getAllComments);
router.delete('/comment/:id', authenticateToken, deleteComment);
router.post('/contact', contactUs);
router.get('/profile/:username', authenticateToken, getProfile);
router.put('/editProfile', authenticateToken, editProfile);

export default router;