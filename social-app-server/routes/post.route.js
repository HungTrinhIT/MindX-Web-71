import express from 'express';
import PostController from '../controllers/post.controller.js';
import uploadMdw from '../middlewares/upload.mdw.js';

const router = express.Router();

router.get('/', PostController.getAllPost);
router.get('/:id', PostController.getSingleByID);
router.post('/', uploadMdw.array('photos'), PostController.createPost);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

export default router;
