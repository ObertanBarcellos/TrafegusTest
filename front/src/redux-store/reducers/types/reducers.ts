import {Car} from "../../../types/car.ts";
import {Driver} from "../../../types/driver.ts";

export interface AppState {
  isDesktop: boolean
  cars: Car[]
  drivers: Driver[]
}
