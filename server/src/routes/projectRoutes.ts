import { Router } from "express";
import prisma  from "../lib/prismaClient.js";

const router = Router();

// Create Project
router.post("/", async (req, res) => {
  const { name, description, managerId, ownerId } = req.body;

    if (!ownerId) {
    return res.status(400).json({ error: "ownerId is required" });
  }

  try {
    const project = await prisma.project.create({
      data: { name, description, managerId,
         owner: { connect: { id: ownerId } } 
       }
    });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: "Failed to create project" });
  }
});

// Get all projects
router.get("/", async (req, res) => {
  const projects = await prisma.project.findMany({
    include: { tasks: true }
  });
  res.json(projects);
});

export default router;
