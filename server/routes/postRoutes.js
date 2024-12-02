import express from 'express';
import { getPosts, createPost, getPostById } from '../controllers/postController.js';

const router = express.Router();

// GET /posts - Retrieve all posts
router.get('/', getPosts);

// POST /posts - Create a new post
router.post('/', createPost);

// GET /posts/:postId - Get a specific post by ID
router.get('/:postId', getPostById);

export default router;
