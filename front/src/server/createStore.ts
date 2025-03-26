import { configureStore } from '@reduxjs/toolkit'
import modernThemeReducers from '../redux-store/reducers'

export default () => {

  return configureStore({
    reducer: modernThemeReducers,
    preloadedState: {
      // @ts-ignore
      app: {
        isDesktop: false,
        cars: []
      },
    }
  })
}

