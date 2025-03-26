import {
  ADD_CAR,
  ADD_DRIVER,
  DELETE_CAR, DELETE_DRIVER,
  SET_CARS,
  SET_DRIVERS,
  SET_IS_DESKTOP,
  UPDATE_CAR,
  UPDATE_DRIVER
} from '../actions'
import {AppState} from './types/reducers'

const initialState: AppState = typeof window !== 'undefined' && window.INITIAL_STATE?.app
  ? window.INITIAL_STATE.app
  : {
    isDesktop: false,
    cars: [],
    drivers: []
  }

export default function reducer(
  state: AppState = initialState,
  action: { type: any; payload: any }
): AppState {
  switch (action.type) {
    case SET_IS_DESKTOP:
      return { ...state, isDesktop: action.payload }
    case SET_CARS:
      return { ...state, cars: action.payload }
    case ADD_CAR:
      return {
        ...state,
        cars: [...state.cars, action.payload]
      }
    case UPDATE_CAR:
      return {
        ...state,
        cars: state.cars.map((car, i) =>
            i === action.payload.index
                ? { ...car, ...action.payload }
                : car
        )
      }
    case DELETE_CAR:
      return {
        ...state,
        cars: state.cars.filter((_, i) => i !== action.payload)
      }
    case SET_DRIVERS:
      return { ...state, drivers: action.payload }
    case ADD_DRIVER:
      return {
        ...state,
        drivers: [...state.drivers, action.payload]
      }
    case UPDATE_DRIVER:
      return {
        ...state,
        drivers: state.drivers.map((driver, i) =>
            i === action.payload.index
                ? { ...driver, ...action.payload }
                : driver
        )
      }
    case DELETE_DRIVER:
      return {
        ...state,
        drivers: state.drivers.filter((_, i) => i !== action.payload)
      }
    default:
      return state
  }
}
