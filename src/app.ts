import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send({ a });
};

app.get("/", test);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
