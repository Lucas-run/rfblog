import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getAll = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};

export const postPost = async (req: Request, res: Response) => {
  console.log(req.body);
  const authToken = req.headers["authorization"];
  if (!authToken || authToken !== `Bearer ${process.env.POST_TOKEN}`) {
    res.status(403).json({ message: "Acesso negado. Token inválido." });
    return;
  }
  const { title, content } = req.body;
  const post = await prisma.post.create({
    data: { title, content },
  });
  res.status(201).json(post);
};

export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const authToken = req.headers["authorization"];
  if (!authToken || authToken !== `Bearer ${process.env.DELETE_TOKEN}`) {
    res.status(403).json({ message: "Acesso negado. Token inválido." });
    return;
  }
  try {
    //verifica se o post com o id existe
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    //deleta
    await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
