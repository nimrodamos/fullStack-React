import express from 'express';
import { getPosts, createPost, getPostById, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

// GET /posts - Get all posts
router.get('/', getPosts);

// POST /posts - Create a new post
router.post('/', createPost);

// GET /posts/:postId - Get a specific post by its ID
router.get('/:postId', getPostById);

// PUT /posts/:postId - Update a post by its ID
router.put('/:postId', updatePost);

// DELETE /posts/:postId - Delete a post by its ID
router.delete('/:postId', deletePost);

export default router;
