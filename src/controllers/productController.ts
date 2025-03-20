import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Richiesta ricevuta:", req.body); 
        const { name, quantity } = req.body;

        if (!name || !quantity) {
            console.log("Campi mancanti:", { name, quantity }); 
            res.status(400).json("Tutti i campi sono obbligatori");
            return;
        }

        console.log("Creazione del prodotto in corso..."); // Debug
        const newProduct = await prisma.product.create({
            data: { name, quantity },
        });

        console.log("Prodotto creato:", newProduct); 
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Errore durante la creazione del prodotto:", error); 
        res.status(500).json({ message: "Errore durante la creazione del prodotto", error });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
    const product = await prisma.product.findMany();
    res.status(200).json(product);
} catch (error) {
    res.status(500).json({ message: "errore durante il caricamento dei prodotti", error })
}
};

export const getPublicProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();
        const simplifiedProducts = products.map(product => ({
            name: product.name,
            availability: product.quantity > 0 ? "Disponibile" : "Non disponibile"
        }));
        res.status(200).json(simplifiedProducts);
    } catch (error) {
        res.status(500).json({ message: "Errore durante il caricamento dei prodotti", error });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, quantity } = req.body;

        const updateProduct = await prisma.product.update({
            where: { id: Number(id) },
            data: { quantity },
        });
        res.json(updateProduct);
    } catch (error) {
        res.status(500).json({ message: "Errore durante l'aggiornamento del prodotto", error});
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ message: "prodotto eliminato con successo"});
    } catch (error) {
        res.status(500).json({ message: "impossibile cancellare questo prodotto", error});
    }
}