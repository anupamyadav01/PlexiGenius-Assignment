import express from "express";
import { getAllCustomers } from "../controller/customerController.js";

export const customerRoutes = express.Router();

customerRoutes.get("/getCustomers", getAllCustomers);
