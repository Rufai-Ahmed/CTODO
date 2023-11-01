import { Application, Request, Response } from "express";
import { statusCode } from "./utils/statusCode";
import todo from "./router/todoRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/api/v1", todo);

    app.get("/", (req: Request, res: Response) => {
      try {
        res.status(statusCode.OK).json({
          message: "Welcome to my API",
        });
      } catch (error) {
        res.status(statusCode.BAD_REQUEST).json({
          message: "Error",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
