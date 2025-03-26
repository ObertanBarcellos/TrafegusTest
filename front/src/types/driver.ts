import {Car} from "./car.ts";

export interface Driver {
    id: number
    name: string
    cpf: string
    rg: string
    phone?: string
    car?: Car
}