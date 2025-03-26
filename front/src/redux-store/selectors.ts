// @ts-ignore
import { DefaultRootState } from 'react-redux'

export const selectIsDesktop = (state: DefaultRootState) => state.app.isDesktop
export const selectCars = (state: DefaultRootState) => state.app.cars
export const selectDrivers = (state: DefaultRootState) => state.app.drivers