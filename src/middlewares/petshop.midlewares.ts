import { Request, Response, NextFunction } from "express";
import { checkExistsUserAccountHeaderType } from "../types/petshop.types";
import { prisma } from "../database/prisma";

export async function checkExistsUserAccount(req: Request<{},{},{},{},checkExistsUserAccountHeaderType>, res: Response, next: NextFunction) {
	const cnpj = req.headers.cnpj;	

	if (Array.isArray(cnpj) || !cnpj) {
		res.status(400).json({
			error: "CNPJ Inválido",
		});
		return;
	}
	const petshop = await prisma.petshop.findUnique({where: {cnpj: cnpj}});
	
	if (!petshop || petshop == null) {
		res.status(404).json({
			error: "Petshop não encontrado",
		});
		return ;
	}
	req.petshop = petshop;
	next();
}
