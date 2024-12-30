import { RequestHandler } from "express";
import { petshops } from "../database";
import { pet, petBodyPost, petBodyPut, petParamsId } from "../types/pet.types";
import { v4 as uuid } from "uuid";

export const getPets: RequestHandler = (req, res) => {
	const pets = req.petshop?.pets || [];
	res.status(200).json({
		pets,
	});
};

export const postPet: RequestHandler<{}, {}, petBodyPost> = (req, res) => {
	const { petshop, body } = req;
	const pet: pet = {
		id: uuid(),
		vaccinated: false,
		...body,
		created_at: new Date().toISOString(),
	};

	const cnpj = petshop?.cnpj;

	const petshopFound = petshops.find((petshop) => petshop.cnpj === cnpj);

	if (!petshopFound) {
		res.status(404).json({
			error: "Petshop não encontrado",
		});
		return;
	}

	petshopFound?.pets.push(pet);

	res.status(201).json({
		pet,
	});
};

export const putPet: RequestHandler<petParamsId, {}, petBodyPut> = (req, res) => {
	const { id } = req.params;

	const petshop = petshops.find((petShop) => petShop.cnpj == req.petshop?.cnpj);

	const pet = petshop?.pets.find((petCurrent) => petCurrent.id == id);

	if (!pet) {
		res.status(404).json({
			error: "Pet não encontrado",
		});
	} else {
		const { name, type, description, deadline_vaccination } = req.body;
		pet.name = name;
		pet.type = type;
		pet.description = description;
		pet.deadline_vaccination = deadline_vaccination;
	}
	res.status(200).json({
		success: "Alteração feita com sucesso",
	});
};

export const patchPetVaccinated: RequestHandler<petParamsId> = (req, res) => {
	const { id } = req.params;

	const petshop = petshops.find((petShop) => petShop.cnpj == req.petshop?.cnpj);

	const pet = petshop?.pets.find((petCurrent) => petCurrent.id == id);

	if (!pet) {
		res.status(404).json({
			error: "Pet não encontrado",
		});
		return;
	} else {
		pet.vaccinated = true;
	}

	res.status(200).json({
		success: "Alteração feita com sucesso",
	});
};

export const deletePet: RequestHandler<petParamsId> = (req, res) => {
	const { id } = req.params;

	const petshop = petshops.find((petShop) => petShop.cnpj == req.petshop?.cnpj);

	const pet = petshop?.pets.find((petCurrent) => petCurrent.id == id);

	if (!pet) {
		res.status(404).json({
			error: "Pet não encontrado",
		});
		return;
	}
	const petIndex = petshop?.pets.findIndex((petCurrent) => petCurrent.id == id);
	if (petIndex !== undefined && petIndex !== -1) {
		petshop?.pets.splice(petIndex, 1);
		res.status(200).json({
			success: "Remoção feita com sucesso",
		});
		return;
	}

	res.status(400).json({
		error: "Não foi possivel remover o pet",
	});
};
