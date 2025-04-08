import express from "express";
import cors from "cors";
import postRoutes from "./routes/posts.route.js";

const app = express();

app.use(cors());
app.use(express.json());

//teste
app.get("/", (req, res) => {
  res.send("API funcionando!");
});
//rotas
app.use("/api/posts", postRoutes);

export default app;
