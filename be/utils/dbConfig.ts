import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";

export const client = new MongoClient(url);

const mainConnection = async () => {
  await client.connect();

  return "Database active";
};

mainConnection()
  .then((res) => {
    console.log(res);
  })
  .catch(() => {
    console.error();
  })
  .finally(() => {
    client.close();
  });

export const db = client.db("todo").collection("task");
