import { Router } from "express";
import { deletePost, getAll, postPost } from "../controllers/post.controller";

const router = Router();

router.get("/", getAll);
router.post("/", postPost);
router.delete("/:id", deletePost);

export default router;
