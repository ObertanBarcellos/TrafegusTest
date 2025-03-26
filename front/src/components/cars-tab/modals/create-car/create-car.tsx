import './create-car.scss'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {createCar} from "../../../../services/cars.ts";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addCarRedux} from "../../../../redux-store/actions";
import CustomSnackbar from "../../../snackbar/snackbar.tsx";

interface CarInputs {
    plate: string
    reindeer?: string
    model: string
    brand: string
    year: number
    color: string
}

export default function CreateCar() {
    const [ open, setOpen ] = useState(false)
    const [ snackbar, setSnackbar ] = useState(false)
    const [ snackbarMessage, setSnackbarMessage ] = useState('')

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CarInputs>()

    const handleCreateCar: SubmitHandler<CarInputs> = async data => {
        try {
            const res = await createCar(data)
            dispatch(addCarRedux(res))
            reset()
            setSnackbarMessage('Veiculo criado com sucesso')
            setSnackbar(true)
            setOpen(false)
        } catch (err) {
            console.error(err)

            // @ts-ignore
            setSnackbarMessage(err?.message)
            setSnackbar(true)
        }
    }

    return (
        <>
            <Button variant="contained" onClick={ () => setOpen(true) }>Novo Veiculo</Button>
            <Dialog open={ open } onClose={ () => setOpen(false) }>
                <DialogTitle>Novo Veiculo</DialogTitle>
                <DialogContent>
                    <form className={ 'default-form' } onSubmit={ handleSubmit(handleCreateCar) }>
                        <div className={ 'form-row' }>
                            <TextField id="filled-basic" label="Placa" variant="filled" { ...register("plate", { required: true }) } />
                            { errors.plate && <span className={ 'error-span' }>Campo obrigatório</span> }
                        </div>
                        <div className={ 'form-row' }>
                            <TextField id="filled-basic" label="Renavam" variant="filled" { ...register("reindeer", { required: false }) } />
                        </div>
                        <div className={ 'form-row' }>
                            <TextField id="filled-basic" label="Modelo" variant="filled" { ...register("model", { required: true }) } />
                            { errors.model && <span className={ 'error-span' }>Campo obrigatório</span> }
                        </div>
                        <div className={ 'form-row' }>
                            <TextField id="filled-basic" label="Marca" variant="filled" { ...register("brand", { required: true }) } />
                            { errors.brand && <span className={ 'error-span' }>Campo obrigatório</span> }
                        </div>
                        <div className={ 'form-row' }>
                            <TextField id="filled-basic" label="Ano" type="number" variant="filled" { ...register("year", { required: true }) } />
                            { errors.year && <span className={ 'error-span' }>Campo obrigatório</span> }
                        </div>
                        <div className={ 'form-row' }>
                            <TextField id="filled-basic" label="Cor" variant="filled" { ...register("color", { required: true }) } />
                            { errors.color && <span className={ 'error-span' }>Campo obrigatório</span> }
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={ () => setOpen(false) }>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={ handleSubmit(handleCreateCar) }>Confirmar</Button>
                </DialogActions>
            </Dialog>
            <CustomSnackbar message={ snackbarMessage } open={ snackbar } setOpen={ setSnackbar } />
        </>
    )
}