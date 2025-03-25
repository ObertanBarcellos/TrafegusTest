import './styles/main.scss'
import LeftMenu from "./components/left-menu/left-menu.tsx";
import {Outlet} from "react-router-dom";

function App() {

  return (
    <>
      <div className={ 'main-container' }>
        <LeftMenu />
        <div className={ 'safe-area' }>
            <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
