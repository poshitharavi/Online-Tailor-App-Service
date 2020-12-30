import express from "express";
import {
  saveStyleController,
  getAllStylesController,
  getStyleByIdController,
} from "./style-controller";

const style = express.Router();

style.post("/save", saveStyleController);
style.get("/get-all", getAllStylesController);
style.get("/get-by-id/:id", getStyleByIdController);

export default style;
