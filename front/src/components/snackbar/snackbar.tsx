import './snackbar.scss'
import {Snackbar} from "@mui/material";
import {SyntheticEvent} from "react";
import {SnackbarCloseReason} from "@mui/material/Snackbar/useSnackbar.types";

interface SnackbarProps {
    message: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function CustomSnackbar(props: SnackbarProps) {
    const { setOpen } = props

    const handleClose = (
        _event: SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    };

    return <Snackbar
        autoHideDuration={ 3000 }
        onClose={ handleClose }
        { ...props }
    />
}