import type { NextFunction, Response, Request } from "express";
import type { ZodSchema } from "zod/v4";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("validate");
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    next();
  };
};
