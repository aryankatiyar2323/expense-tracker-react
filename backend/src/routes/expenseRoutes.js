import express from "express";
import db from "../db/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, category, amount, date } = req.body;
    const userId = req.user.id;

    await db.query(
      `INSERT INTO expenses
            (title, category, amount, date, user_id)
            VALUES
            ($1, $2, $3, $4, $5)
            `,
      [title, category, amount, date, userId],
    );

    return res.status(201).json({
      message: "Expense inserted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `
            SELECT * FROM expenses
            WHERE user_id = $1
            `,
      [userId],
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseId = req.params.id;
    const { title, category, amount, date } = req.body;

    const result = await db.query(
      `UPDATE expenses
            SET
            title = $1,
            category = $2,
            amount = $3,
            date = $4
            WHERE
            id = $5
            AND
            user_id = $6
            `,
      [title, category, amount, date, expenseId, userId],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    return res.status(200).json({ message: "Updated expenses successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseId = req.params.id;

    const result = await db.query(
      `
            DELETE FROM expenses
            WHERE
            id = $1
            AND
            user_id = $2 
            `,
      [expenseId, userId],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

export default router;
