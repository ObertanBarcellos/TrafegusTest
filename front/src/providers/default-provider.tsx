import { PropsWithChildren, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {setCars, setDrivers, setIsDesktop} from '../redux-store/actions'
import {getCars} from "../services/cars.ts";
import {getDrivers} from "../services/drivers.ts";

export default function DefaultProvider({ children }: PropsWithChildren) {
  const dispatch = useDispatch()

  function updateIsDesktop() {
    if (window.innerWidth >= 1024) {
      dispatch(setIsDesktop(true))
    } else if (window.innerWidth < 1024) {
      dispatch(setIsDesktop(false))
    }
  }

  useEffect(() => {
    updateIsDesktop()

    const fetch = async () => {
      try {
        const cars = await getCars()
        const drivers = await getDrivers()
        dispatch(setCars(cars))
        dispatch(setDrivers(drivers))
      } catch (err) {
        console.error(err)
      }
    }

    fetch()
  }, [])

  return children
}
