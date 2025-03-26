import './header.scss'
import {Button, IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {isDesktop} from "../../utils/desktop.ts";

export default function Header() {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ hidden, setHidden ] = useState(false)

    const navigate = useNavigate()
    const desktop = isDesktop()

    function handleMenuChange() {
        if (isOpen) {
            setHidden(true)

            const interval = setInterval(() => {
                setHidden(false)
                setIsOpen(false)
                clearInterval(interval)
            }, 300)

        } else {
            setIsOpen(true)
        }
    }

    function handleAlterPage(page: string) {
        navigate(`/${ page }`)
        handleMenuChange()
    }

    return (
        <>
            <div className={ 'main-header-content mobile' }>
                <img src={ 'https://trafegus.rootcore.com.br/wp-content/uploads/2024/07/logo-trafegus-white-2.svg#3' } alt="logo" />
                { !desktop && <>
                    <IconButton className={ 'menu-icon' } onClick={ handleMenuChange }>
                        <MenuIcon className={ 'icon' } />
                    </IconButton>
                    <div className={ `mobile-menu ${ isOpen && `active` } ${ hidden && `hidden` }` }>
                        <Button variant={ 'text' } onClick={ () => handleAlterPage('tables') }>Veiculos e Motoristas</Button>
                        <Button variant={ 'text' } onClick={ () => handleAlterPage('maps') }>Mapa</Button>
                    </div>
                </> }
                {
                    desktop && <>
                        <div className={ 'desktop-menu' }>
                            <Button variant={ 'text' } onClick={ () => navigate('/tables') }>Veiculos e Motoristas</Button>
                            <Button variant={ 'text' } onClick={ () => navigate('/maps') }>Mapa</Button>
                        </div>
                    </>
                }
            </div>
        </>
    )
}