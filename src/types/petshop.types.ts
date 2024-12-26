import { pet } from "./pet.types";

export interface petshop { 
	id: string,
	name: string, 
	cnpj: string, 
	pets: pet[]
}

export type createPetshop = Omit<petshop, "id" | "pets">;




