import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

// Get all comments for a specific post
export const getCommentsByPostId = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comment.find({ postId }).populate('authorId');
        res.status(200).json(comments); // Return comments
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new comment to a post
export const createComment = async (req, res) => {
    const { postId, text, authorId } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = new Comment({ postId, text, authorId });
        await comment.save();

        // Optionally, add the comment reference to the post
        await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

        res.status(201).json(comment); // Return created comment
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
