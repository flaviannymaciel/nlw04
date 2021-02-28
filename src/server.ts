import 'reflect-metadata'; // importante vir primeiro
import { app } from "./app";

const port = 3456;
app.listen(port, () => console.log("Server is running!"));
