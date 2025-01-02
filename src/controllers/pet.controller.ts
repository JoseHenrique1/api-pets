import { RequestHandler } from "express";
import { petBodyPost, petBodyPut, petParamsId } from "../types/pet.types";

import { prisma } from "../database/prisma";

export const getPets: RequestHandler = async (req, res) => {
	const pets = await prisma.pet.findMany({
		where: {
			ownerCnpj: req.petshop?.cnpj,
		},
	});
	res.status(200).json({
		pets,
	});
};

export const postPet: RequestHandler<{}, {}, petBodyPost> = async (req, res) => {
	const { petshop, body } = req;
	const cnpj = petshop?.cnpj;

	const petshopFound = await prisma.petshop.findUnique({ where: { cnpj: cnpj } });

	if (!petshopFound || cnpj == undefined) {
		res.status(404).json({
			error: "Petshop não encontrado",
		});
		return;
	}

	const pet = {
		vaccinated: false,
		...body,
		deadline_vaccination: new Date(body.deadline_vaccination).toISOString(),
		ownerCnpj: cnpj,
	};

	const petCreated = await prisma.pet.create({ data: pet });

	res.status(201).json({
		petCreated,
	});
};

export const putPet: RequestHandler<petParamsId, {}, petBodyPut> = async (req, res) => {
	const { id } = req.params;
	const pet = await prisma.pet.findUnique({ where: { id } });

	if (!pet) {
		res.status(404).json({
			error: "Pet não encontrado",
		});
		return;
	}
	const { name, type, description, deadline_vaccination } = req.body;

	await prisma.pet.update({
		where: { id: id },
		data: {
			name,
			type,
			description,
			deadline_vaccination: new Date(deadline_vaccination).toISOString(),
		},
	});

	res.status(200).json({
		success: "Alteração feita com sucesso",
	});
};

export const patchPetVaccinated: RequestHandler<petParamsId> = async (req, res) => {
	const { id } = req.params;
	const pet = await prisma.pet.findUnique({ where: { id } });

	if (!pet) {
		res.status(404).json({
			error: "Pet não encontrado",
		});
		return;
	}

	await prisma.pet.update({
		where: { id: id },
		data: {
			vaccinated: true,
		},
	})
	res.status(200).json({
		success: "Alteração feita com sucesso",
	});
};

export const deletePet: RequestHandler<petParamsId> = async (req, res) => {
	const { id } = req.params;
	const pet = await prisma.pet.findUnique({ where: { id } });

	if (!pet) {
		res.status(404).json({
			error: "Pet não encontrado",
		});
		return;
	}
	await prisma.pet.delete({ where: { id } });
	res.status(200).json({
		success: "Remoção feita com sucesso",
	});
};
