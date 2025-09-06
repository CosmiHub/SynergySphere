import { Router } from "express";
import prisma from "../lib/prismaClient.js";

const router = Router();

// Create Task
router.post("/", async (req, res) => {
  const { title, description, projectId, assigneeId, deadline, priority, tags, status, image } = req.body;

  if (!title || !projectId || !assigneeId) {
    return res.status(400).json({ error: "title, projectId, and assigneeId are required" });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        project: { connect: { id: projectId } },
        assignee: { connect: { id: assigneeId } },
        dueDate: deadline ? new Date(deadline) : null,
        priority: priority || "Medium",
        tags: tags || [],
        status: status || "To-Do",
        // image: image || null,
      },
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Prisma error:", err);
    res.status(500).json({ error: "Failed to create task", details: err });
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        assignee: true,
      },
    });
    res.json(tasks);
  } catch (err) {
    console.error("Prisma error:", err);
    res.status(500).json({ error: "Failed to fetch tasks", details: err });
  }
});

export default router;
