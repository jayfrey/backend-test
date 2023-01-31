import { StatusCodes } from "http-status-codes";

export const validator = (schema: any) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(
      req.method == "GET" ? req.query : req.body
    );
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const errorMessage = details.map((i: any) => i.message).join(",");

      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        message: "Middleware validation error",
        error: errorMessage,
      });
    }
  };
};
