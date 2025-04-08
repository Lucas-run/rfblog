import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getAll = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};

export const postPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const post = await prisma.post.create({
    data: { title, content },
  });
  res.status(201).json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    //verifica se o post com o id existe
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    //deleta
    await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Post deleted sucessfully" });
  } catch (error) {
    console.error("Error deleting post: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
