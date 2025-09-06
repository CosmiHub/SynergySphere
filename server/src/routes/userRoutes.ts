import { Router } from "express";
import  prisma  from "../lib/prismaClient.js";
import bcrypt from "bcryptjs"
import { PrismaClient, User } from "@prisma/client";

import jwt from "jsonwebtoken";

const router = Router();

//generating jwt token
const generateJwt = (user: User): string => {
  return jwt.sign({ email: user.email }, "JWT_SECRET");
};

// Register
router.post("/register", async (req, res) => {

  try {
     
  const hashedPassword = await bcrypt.hash(req.body.password, 10);


    const user = await prisma.user.create({
      data: { ...req.body, password: hashedPassword }
    });
    const {password : _password, ...userWithoutPassword } = user;
    res.json({...userWithoutPassword,token: generateJwt(user)});
  } catch (err) {
    res.status(400).json({ error: "User already exists or invalid data" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ error: "User not found" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: "Invalid password" });

  res.json({ message: "Login successful", user });
});

export default router;
