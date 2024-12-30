import { Request, Response, NextFunction } from "express";
import { petshops } from "../database";
import { checkExistsUserAccountHeaderType } from "../types/petshop.types";

export function checkExistsUserAccount(req: Request<{},{},{},{},checkExistsUserAccountHeaderType>, res: Response, next: NextFunction) {
	const cnpj = req.headers.cnpj;	

	if (Array.isArray(cnpj) || !cnpj) {
		res.status(400).json({
			error: "CNPJ Inválido",
		});
		return;
	}
	const petshop = petshops.find((petshopCurrent) => petshopCurrent.cnpj === cnpj);
	
	if (!petshop) {
		res.status(404).json({
			error: "Petshop não encontrado",
		});
		return ;
	}

	req.petshop = petshop;

	next();
}
