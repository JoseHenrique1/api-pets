export type pet = {
	id: string; // precisa ser um uuid
	name: string;
	type: string;
	description: string;
	vaccinated: boolean;
	deadline_vaccination: string;
	created_at: string;
};

export type petBodyPost = Omit<pet, "id" | "created_at" | "vaccinated">;

export type petParamsId = {
	id: string;
};

export type petBodyPut = Omit<pet, "id" | "created_at" | "vaccinated">;

//export type petBodyPatch = Omit<pet, "id" | "created_at" | "name" | "type" | "description" | "deadline_vaccination">

//name , type, description , e deadline devacinação
