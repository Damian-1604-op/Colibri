import { Router } from "express";

import {
  getAllAddress,
  getAddressById,
  createAddres,
  updateAddres,
} from "../controller/address.controller.js";
const router = Router();

router.get("/address", getAllAddress);
router.get("/address/:id", getAddressById);
router.post("/address", createAddres);
router.put("/address/:id", updateAddres);

export default router;
