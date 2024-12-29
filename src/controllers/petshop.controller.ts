import { petshops } from "../database";
import { Request, Response } from "express";
import { createPetshop } from "../types/petshop.types";
import { v4 as uuid } from "uuid";

export function createPetshop(req: Request<{}, {}, createPetshop, {}>, res: Response) {
	const { name, cnpj } = req.body;

	const petshop = {
		id: uuid(),
		name,
		cnpj,
		pets: [],
	};

	const petshopExists = petshops.find((petshop) => petshop.cnpj === cnpj);
	if (petshopExists) {
		res.status(400).json({
			error: "Petshop já existe!",
		});
	}

	petshops.push(petshop);
	res.status(201).json({
		petshop,
	});
}
