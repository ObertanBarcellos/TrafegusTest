import "reflect-metadata";
import express from "express";
import cors from 'cors';
import {AppDataSource} from "./data-source";
import carRoutes from "./routes/carRoutes";
import driverRoutes from "./routes/driverRoutes";

const app = express()
app.use(cors())
const PORT = 5000

app.use(express.json())
app.use("/cars", carRoutes)
app.use("/drivers", driverRoutes)

AppDataSource.initialize()
    .then(() => {
        console.log("Banco de dados conectado")
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${ PORT }`)
        })
    })
    .catch((error) => console.log("Erro ao conectar ao banco de dados:", error))