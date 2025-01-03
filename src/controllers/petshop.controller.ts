import { petshops } from "../database";
import { Request, Response } from "express";
import { createPetshop } from "../types/petshop.types";
import { v4 as uuid } from "uuid";
import { isValidCNPJ } from "../utils/isvalid-cnpj";

export function createPetshop(req: Request<{}, {}, createPetshop, {}>, res: Response) {
	const { name, cnpj } = req.body;

	const petshop = {
		id: uuid(),
		name,
		cnpj,
		pets: [],
	};

	if (!isValidCNPJ(cnpj)) {
		res.status(400).json({
			error: "CNPJ Inválido",
		})
		return;
	}

	const petshopExists = petshops.find((petshop) => petshop.cnpj === cnpj);
	if (petshopExists) {
		res.status(400).json({
			error: "Petshop já existe!",
		});
		return;
	}

	petshops.push(petshop);
	res.status(201).json({
		petshop,
	});
}
