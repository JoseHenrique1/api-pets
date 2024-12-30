import { pet } from "./pet.types";

export interface petshopType {
	id: string;
	name: string;
	cnpj: string;
	pets: pet[];
}

export type createPetshop = Omit<petshopType, "id" | "pets">;

export type checkExistsUserAccountHeaderType = {
	cnpj: string;
};
