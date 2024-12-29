import { router as routerPetshop } from "./petshop.routes";
import { router as routerPet } from "./pet.routes";
import { Router } from "express";

export const router = Router();

router.use(routerPetshop);
router.use(routerPet);