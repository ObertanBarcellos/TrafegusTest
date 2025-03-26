import './create-driver.scss'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {createDriver} from "../../../../services/drivers.ts";
import {Car} from "../../../../types/car.ts";
import {createSelector} from "@reduxjs/toolkit";
import {selectCars} from "../../../../redux-store/selectors.ts";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {addDriverRedux} from "../../../../redux-store/actions";
import CustomSnackbar from "../../../snackbar/snackbar.tsx";

interface DriverInputs {
    name: string
    rg: string
    cpf: string
    phone: string
    car: Car
}

const defaultCar: Car = {
    id: -1,
    plate: 'Nenhum',
    color: '',
    year: 1999,
    brand: '',
    model: ''
}

const selector = createSelector([ selectCars ], (cars) => ({ cars }))

export default function CreateDriver() {
    const dispatch = useDispatch()
    const { cars } = useSelector(selector, shallowEqual)

    const [ open, setOpen ] = useState(false)
    const [ car, setCar ] = useState<Car>(defaultCar)
    const [ snackbar, setSnackbar ] = useState(false)
    const [ snackbarMessage, setSnackbarMessage ] = useState('')

    const { register, handleSubmit, formState: { errors }, reset } = useForm<DriverInputs>()

    const handleCreateCar: SubmitHandler<DriverInputs> = async data => {
        try {
            const res = await createDriver({ ...data, car })
            dispatch(addDriverRedux(res))
            reset()
            setSnackbarMessage('Motorista criado com sucesso')
            setSnackbar(true)
            setOpen(false)
        } catch (err) {
            console.error(err)

            // @ts-ignore
            setSnackbarMessage(err?.message)
            setSnackbar(true)
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setCar(cars.find((car: Car) => car.id == parseInt(event.target.value)))
    }

    return (
        <>
            <Button variant="contained" onClick={ () => setOpen(true) }>Novo Motorista</Button>
            <Dialog open={ open } onClose={ () => setOpen(false) }>
                <DialogTitle>Novo Motorista</DialogTitle>
                <DialogContent>
                    <form className={ 'default-form' } onSubmit={ handleSubmit(handleCreateCar) }>
                        <div className={ 'form-row' }>
                            <TextField id="filled-basic" label="Nome" variant="filled" { ...register("name", { required: true }) } />
                            { errors.name && <span className={ 'error-span' }>Campo obrigatório</span> }
                        </div>
                        <div className={ 'form-row' }>
                            <TextField id="filled-basic" label="RG" variant="filled" { ...register("rg", { required: true }) } />
                            { errors.rg && <span className={ 'error-span' }>Campo obrigatório</span> }
                        </div>
                        <div className={ 'form-row' }>
                            <TextField id="filled-basic" label="CPF" variant="filled" { ...register("cpf", { required: true }) } />
                            { errors.cpf && <span className={ 'error-span' }>Campo obrigatório</span> }
                        </div>
                        <div className={ 'form-row' }>
                            <TextField id="filled-basic" label="Telefone" type="tel" variant="filled" { ...register("phone", { required: false }) } />
                        </div>
                        <div className={ 'form-row' }>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={ String(car.id) }
                                label="Age"
                                onChange={ handleChange }
                            >
                                <MenuItem value={ '-1' }>Nenhum</MenuItem>
                                {
                                    cars.map((car: Car) => (<MenuItem value={ car.id }>{ car.plate }</MenuItem>))
                                }
                            </Select>
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