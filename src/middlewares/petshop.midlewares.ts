import { Request, Response, NextFunction } from "express";
import { petshops } from "../database";

export function checkExistsUserAccount(req: Request, res: Response, next: NextFunction) {
	const cnpj = req.headers["cnpj"];
	const petshop = petshops.find((petshopCurrent) => petshopCurrent.cnpj === cnpj);
	
	if (!petshop) {
		return res.status(404).json({
			error: "Petshop not found",
		});
	}

	req.petshop = petshop;

	next();
}
