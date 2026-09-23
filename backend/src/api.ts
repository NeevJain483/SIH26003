import { Router } from "express";
import { Login, Register } from "@mindcare/common";
import z from "zod";
import { db } from "@mindcare-ner/db";

export const auth = Router();

auth.post("/register", async (req, res) => {
  const parse = Register.safeParse(req.body);
  if (!parse.success) {
    const { fieldErrors, formErrors } = z.flattenError(parse.error);
    return res.status(422).json({
      message: "Please correct the highlighted fields.",
      errors: fieldErrors,
      formErrors,
    });
  }

  const users = await db;

  res.json({
    msg: "register",
  });
});

auth.post("/login", (req, res) => {
  const parse = Login.safeParse(req.body);
  if (!parse.success) {
    const { fieldErrors, formErrors } = z.flattenError(parse.error);
    return res.status(422).json({
      message: "Please correct the highlighted fields",
      errors: fieldErrors,
      formErrors,
    });
  }

  res.json({
    msg: "login",
  });
});
