import { Request, Response } from "express";
import { statusCode } from "../utils/statusCode";
import { client, db } from "../utils/dbConfig";
import { todoModel } from "../model/todoModel";
import { ObjectId } from "mongodb";
import moment from "moment";

export const getTasks = async (req: Request, res: Response) => {
  try {
    await client.connect();

    const tasks = await db.find().toArray();

    res.status(statusCode.OK).json({
      message: "Task created successfully",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    await client.connect();

    const { taskID } = req.params;

    const tasks = await db.findOne({ _id: new ObjectId(taskID) });

    res.status(statusCode.OK).json({
      message: "Task created successfully",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    await client.connect();

    const { task, timer } = req.body;
    const newTime = timer * 1000;
    let time = new Date().getTime() + newTime;
    const createdAt = moment(new Date().getTime()).format("LLLL");
    const achievedAt = moment(time).format("LLLL");
    const achieved = null;

    const todo = new todoModel(task, createdAt, achieved, achievedAt);
    const timmer = setTimeout(async () => {
      await db.updateOne(
        { _id: new ObjectId(todo._id) },
        { $set: { achieved: true } }
      );
      clearTimeout(timmer);
    }, newTime);

    await db.insertOne(todo);

    res.status(statusCode.OK).json({
      message: "Task created successfully",
      data: todo,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    await client.connect();

    const { taskID } = req.params;

    let find: any = await db.findOne({ _id: new ObjectId(taskID) });

    if (find.achieved) {
      res.status(statusCode.OK).json({
        message: "Time has elapsed",
      });
    } else {
      let todo = await db.updateOne(
        { _id: new ObjectId(taskID) },
        { $set: { done: true } }
      );

      res.status(statusCode.CREATED).json({
        message: "Task completed",
        data: todo,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await client.connect();

    const { taskID } = req.params;

    let data = await db.deleteOne({ _id: new ObjectId(taskID) });

    res.status(statusCode.OK).json({
      message: "Task deleted",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};
