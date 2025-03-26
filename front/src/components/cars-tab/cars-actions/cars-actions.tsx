import './cars-actions.scss'
import CreateCar from "../modals/create-car/create-car.tsx";

export default function CarsActions() {
    return (
        <>
            <div className={ 'cars-actions-container' }>
                <CreateCar />
            </div>
        </>
    )
}