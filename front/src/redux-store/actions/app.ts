// @ts-ignore
import {DefaultRootState} from 'react-redux'
import {Car} from "../../types/car.ts";
import {Driver} from "../../types/driver.ts";

export const SET_IS_DESKTOP = 'set_is_desktop'
export const SET_CARS = 'set_cars'
export const ADD_CAR = 'add_car'
export const UPDATE_CAR = 'update_car'
export const DELETE_CAR = 'delete_car'
export const SET_DRIVERS = 'set_drivers'
export const ADD_DRIVER = 'add_driver'
export const UPDATE_DRIVER = 'update_driver'
export const DELETE_DRIVER = 'delete_driver'

declare global {
  interface Window {
    INITIAL_STATE: DefaultRootState;
  }
}

export const setIsDesktop = (payload: boolean) => ({ type: SET_IS_DESKTOP, payload })

export const setCars = (payload: Car[]) => ({ type: SET_CARS, payload })
export const addCarRedux = (payload: Car) => ({
  type: ADD_CAR,
  payload
});
export const updateCarRedux = (index: number, payload: Partial<Car>) => ({
  type: UPDATE_CAR,
  payload: { index, ...payload }
})
export const deleteCarRedux = (index: number) => ({
  type: DELETE_CAR,
  payload: index
});


export const setDrivers = (payload: Driver[]) => ({ type: SET_DRIVERS, payload })
export const addDriverRedux = (payload: Driver) => ({
  type: ADD_DRIVER,
  payload
});
export const updateDriverRedux = (index: number, payload: Partial<Driver>) => ({
  type: UPDATE_DRIVER,
  payload: { index, ...payload }
})
export const deleteDriverRedux = (index: number) => ({
  type: DELETE_DRIVER,
  payload: index
});