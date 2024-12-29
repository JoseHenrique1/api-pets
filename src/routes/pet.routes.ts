import { Router } from "express";
import { checkExistsUserAccount } from "../middlewares/petshop.midlewares";
import { getPets, postPet, putPet, patchPetVaccinated, deletePet } from "../controllers/pet.controller";

export const router = Router();

router.use(checkExistsUserAccount);
router.get("/pets", getPets);
router.post("/pets", postPet);
router.put("/pets/:id", putPet);
router.patch("/pets/:id/vaccinated", patchPetVaccinated);
router.delete("/pets/:id", deletePet);
