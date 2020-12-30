import express from "express";
import v0Routers from "./v0";

const router = express.Router();
router.use("/v0", v0Routers);
export default router;
