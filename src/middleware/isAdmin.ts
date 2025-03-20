import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


interface AuthenticatedRequest extends Request {
    user?: { id: number }; 
}

export const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
       
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "Utente non autenticato" });
            return;
        }

        const { id } = req.user;

       
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        
        if (!user || !user.isAdmin) {
           res.status(403).json({ message: "Non sei autorizzato a eseguire questa azione" });
           return;
        }

       
        next();
    } catch (error) {
        console.error("Errore nel middleware isAdmin:", error);
        res.status(500).json({ message: "Errore interno del server" });
    }
};