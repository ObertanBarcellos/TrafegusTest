import './styles/main.scss'
import './App.scss'
import {Outlet} from "react-router-dom";
import Header from "./components/header/header.tsx";

function App() {

    return (
        <>
            <div className={ `app-container` }>
                <div className={ 'home-container' }>
                    <Header />
                    <div className={ 'safe-area' }>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
