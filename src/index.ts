import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/routes";
import { connect } from "./config/server";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3400;

app.use(cors());
app.use(express.json());
app.use(routes); 

connect();

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}.`);
});

export default app;
