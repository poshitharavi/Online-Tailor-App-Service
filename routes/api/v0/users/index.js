import express from "express";
import { authUserController, saveUserController } from "./user-controller";

const users = express.Router();

users.post("/save", saveUserController);
users.post("/auth-user", authUserController);

export default users;
