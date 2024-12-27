import express from "express";
import { getDashboardData } from "../controller/dataController.js";

export const generalRoutes = express.Router();

generalRoutes.get("/getDashboardData", getDashboardData);
