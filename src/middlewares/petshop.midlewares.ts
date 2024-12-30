import { Request, Response, NextFunction } from "express";
import { petshops } from "../database";
import { checkExistsUserAccountHeaderType } from "../types/petshop.types";

export function checkExistsUserAccount(req: Request<{},{},{},{},checkExistsUserAccountHeaderType>, res: Response, next: NextFunction) {
	const cnpj = req.headers.cnpj;	

	if (Array.isArray(cnpj) || !cnpj) {
		return res.status(400).json({
			error: "CNPJ Inválido",
		});
	}
	const petshop = petshops.find((petshopCurrent) => petshopCurrent.cnpj === cnpj);
	
	if (!petshop) {
		return res.status(404).json({
			error: "Petshop não encontrado",
		});
	}

	req.petshop = petshop;

	next();
}
