import type { createPetshop, petshopType } from "../types/petshop.types";
import type { Petshop } from "../database/prisma";

declare global {
	namespace Express {
		export interface Request {
			petshop?: Petshop;
		}
	}
}
