
import type { createPetshop, petshopType } from "../types/petshop.types";

declare global {
  namespace Express {
    export interface Request {
      petshop?: petshopType;
    }
  }
}
