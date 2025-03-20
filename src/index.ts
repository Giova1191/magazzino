import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes"; // Import delle route di autenticazione
import productRoutes from "./routes/productRoutes"; // Import delle route dei prodotti

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/auth", authRoutes); // Registra le route di autenticazione
app.use("/products", productRoutes); // Registra le route dei prodotti

app.get("/", (req, res) => {
    res.send("Benvenuti nel magazzino");
});

app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
