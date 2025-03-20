import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password || isAdmin === undefined) {
        res.status(400).json({ message: "Tutti i campi sono obbligatori" });
        return; 
    }

    try {
        const newUser = await prisma.user.create({
            data: { name, email, password, isAdmin },
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Errore durante la creazione dell'utente:", error);
        res.status(500).json({ message: "Errore durante la creazione dell'utente", error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password, isAdmin } = req.body;

    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email, password, isAdmin },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Errore durante l'aggiornamento dell'utente", error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.user.delete({
            where: { id: Number(id) }

        });
        res.json({ message: "user eliminato con suxscceso" })
    } catch (error) {
        res.status(500).json({ message: "impossibile eliminare l'utente", error });
    }

}