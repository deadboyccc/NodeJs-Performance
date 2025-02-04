// https://jsonplaceholder.typicode.com/post

import express, { Response, Request } from "express";
import axios from "axios";

let num: number = 0;
const app = express();
app.get("/api", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    num++;
    console.log(`[${process.pid}] [${num}]`);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("An error occurred while fetching data.");
  }
});
const port = (process.env.PORT as unknown as number) || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
