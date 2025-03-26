import './drivers-actions.scss'
import CreateDriver from "../modals/create-driver/create-driver.tsx";

export default function DriversActions() {
    return (
        <>
            <div className={ 'drivers-actions-container' }>
                <CreateDriver />
            </div>
        </>
    )
}