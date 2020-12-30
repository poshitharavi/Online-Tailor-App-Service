import express from "express";
import { getAllSamplesController } from "./sample-controller";

const sample = express.Router();

sample.get("/", getAllSamplesController);

export default sample;
