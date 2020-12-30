import express from "express";
import mesurment from "./mesurments";
import user from "./users";
import order from "./orders";
import style from "./styles";
import tailor from "./tailors";
import predictmesurment from "./predictmesurment";

const router = express.Router();

router.use("/mesurment", mesurment);
router.use("/order", order);
router.use("/style", style);
router.use("/tailor", tailor);
router.use("/user", user);
router.use("/predictmesurment", predictmesurment);

export default router;
