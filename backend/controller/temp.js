import { UserModel } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateOTP from "../services/generateOTP.js";
import sendMail from "../services/sendMail.js";

export const register = async (req, res) => {};

export const login = async (req, res) => {};

export const getUsers = async (req, res) => {};

export const checkLoggedIn = async (req, res) => {};

export const logout = async (req, res) => {};

export const forgotPassword = async (req, res) => {};

export const verifyOTP = async (req, res) => {};

export const resetPassword = async (req, res) => {};
