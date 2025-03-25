import "reflect-metadata";
import {DataSource} from "typeorm";
import {Car} from "./entities/Car.js";
import {Driver} from "./entities/Driver.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "trafegus",
    synchronize: true,
    logging: true,
    entities: [ Car, Driver ],
    migrations: [],
    subscribers: [],
})