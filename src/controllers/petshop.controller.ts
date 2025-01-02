import { Request, Response } from "express";
import { createPetshop } from "../types/petshop.types";
import { isValidCNPJ } from "../utils/isvalid-cnpj";
import { prisma } from "../database/prisma";

export async function createPetshop(req: Request<{}, {}, createPetshop, {}>, res: Response) {
	const { name, cnpj } = req.body;

	const petshop = {
		name,
		cnpj,
	};

	if (!isValidCNPJ(cnpj)) {
		res.status(400).json({
			error: "CNPJ Inválido",
		});
		return;
	}

	const petshopExists = await prisma.petshop.findUnique({ where: { cnpj: cnpj } });
	if (petshopExists) {
		res.status(400).json({
			error: "Petshop já existe!",
		});
		return;
	}

	const petshopCreated = await prisma.petshop.create({ data: petshop });
	res.status(201).json({
		petshopCreated,
	});
}
