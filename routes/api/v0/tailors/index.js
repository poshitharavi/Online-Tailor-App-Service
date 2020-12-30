import express from "express";
import {
  saveTailorController,
  authTailorController,
  getAllTailorsController,
} from "./tailor-controller";

const tailor = express.Router();

tailor.post("/save", saveTailorController);
tailor.post("/auth-tailor", authTailorController);
tailor.get("/get-all", getAllTailorsController);

export default tailor;
