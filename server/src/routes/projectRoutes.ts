import { Router } from "express";
import prisma from "../lib/prismaClient.js";
import { authenticate, ExpressRequest } from "../middleware/auth.js";

const router = Router();

// Create Project with all fields
router.post("/", authenticate, async (req: ExpressRequest, res) => {
  const { name, description, deadline, status, priority, managerId } = req.body;

  if (!name || !status) {
    return res.status(400).json({ error: "name and status are required" });
  }

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        deadline: deadline ? new Date(deadline) : undefined,
        status, // make sure the status is one of ["TODO", "IN_PROGRESS", "DONE"]
        priority: priority || "MEDIUM", // defaults to "MEDIUM" if not provided
        owner: {
          connect: { id: req.user.id }, // the authenticated user becomes the owner
        },
        manager: managerId ? { connect: { id: managerId } } : undefined,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to create project",
    });
  }
});

// Get all projects
router.get("/", authenticate, async (_req: ExpressRequest, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        tasks: true,
        owner: true,
        manager: true,
      },
    });
    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to fetch projects",
    });
  }
});

export default router;
