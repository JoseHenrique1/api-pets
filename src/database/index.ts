import { petshopType } from "../types/petshop.types";

export const petshops: petshopType[] = [
	{
		id: "acde070d-8c4c-4f0d-9d8a-162843c10333",
		name: "petshop Almarante",
		cnpj: "20.031.219/0002-46",
		pets: [
			{
				id: "uuidhere",
				name: "fumaça",
				description: "um lobo",
				type: "lobo",
				created_at: "2024-12-12",
				vaccinated: true,
				deadline_vaccination: "2030-12-12"
			}
		],
	},
];
