import { ObjectId } from "mongodb";

export class todoModel {
  public _id: ObjectId;
  public task: string;
  public createdAt: string;
  public achieved: boolean | null;
  public achievedAt: string | null;
  public done: boolean | null;

  constructor(
    task: string,
    createdAt: string,
    achieved: boolean | null,
    achievedAt: string
  ) {
    this._id = new ObjectId();
    this.task = task;
    this.createdAt = createdAt;
    this.achieved = achieved;
    this.achievedAt = achievedAt;
    this.done = false;
  }
}
