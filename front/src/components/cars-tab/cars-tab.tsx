import './cars-tab.scss'
import {deleteCar, updateCar} from "../../services/cars.ts";
import {reactFormatter, ReactTabulator} from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import CarsActions from "./cars-actions/cars-actions.tsx";
import {IconButton, Tooltip} from "@mui/material";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {createSelector} from "@reduxjs/toolkit";
import {selectCars} from "../../redux-store/selectors.ts";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {deleteCarRedux, updateCarRedux} from "../../redux-store/actions";
import {Car} from "../../types/car.ts";
import CustomSnackbar from "../snackbar/snackbar.tsx";
import {useState} from "react";

const selector = createSelector([ selectCars ], (cars) => ({ cars }))

export default function CarsTab() {
    const { cars } = useSelector(selector, shallowEqual)
    const dispatch = useDispatch()

    const [ snackbar, setSnackbar ] = useState(false)
    const [ snackbarMessage, setSnackbarMessage ] = useState('')

    const ActionButtons = ({ cell }: any) => {
        const rowData = cell.getRow().getData()

        const handleEditCar = async () => {
            try {
                await updateCar(rowData.id, rowData)
                dispatch(updateCarRedux(rowData.id, rowData))
                setSnackbarMessage('Veiculo atualizado com sucesso')
                setSnackbar(true)
            } catch (err) {
                console.error(err)

                // @ts-ignore
                setSnackbarMessage(err?.message)
                setSnackbar(true)
            }
        }

        const handleDeleteCar = async () => {
            try {
                const carIndex = cars.findIndex((car: Car) => car.id === rowData.id)
                await deleteCar(rowData.id)
                dispatch(deleteCarRedux(carIndex))
                setSnackbarMessage('Veiculo excluido com sucesso')
                setSnackbar(true)
            } catch (err) {
                console.error(err)

                // @ts-ignore
                setSnackbarMessage(err?.message)
                setSnackbar(true)
            }
        }

        return (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Tooltip title={ 'Salvar' }>
                    <IconButton style={ { color: '#47c113' } } onClick={ handleEditCar }>
                        <SaveAsIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={ 'Excluir' }>
                    <IconButton style={ { color: '#c11313' } } onClick={ handleDeleteCar }>
                        <DeleteForeverIcon />
                    </IconButton>
                </Tooltip>
            </div>
        )
    }

    const columns = [
        { title: 'ID', field: 'id', sortable: false, headerSort: false, },
        { title: 'Placa', field: 'plate', sortable: false, headerSort: false, editor: "input" },
        {
            title: 'Renavam',
            field: 'reindeer',
            formatter: (cell: any) => {
                const reindeer = cell._cell?.value
                return reindeer && reindeer.length > 0 ? reindeer : 'Nenhum'
            },
            sortable: false,
            headerSort: false,
            editor: "input"
        },
        { title: 'Modelo', field: 'model', sortable: false, headerSort: false, editor: "input" },
        { title: 'Marca', field: 'brand', sortable: false, headerSort: false, editor: "input" },
        { title: 'Ano', field: 'year', sortable: false, headerSort: false, editor: "input" },
        { title: 'Cor', field: 'color', sortable: false, headerSort: false, editor: "input" },
        {
            title: "Ações",
            field: "actions",
            formatter: reactFormatter(<ActionButtons />),
            sortable: false,
            headerSort: false,
            width: 150,
        }
    ]

    return (
        <>
            <div className={ 'cars-tab' }>
                <CarsActions />
                <ReactTabulator
                    data={ cars }
                    // @ts-ignore
                    columns={ columns }
                    layout={ 'fitColumns' }
                />
                <CustomSnackbar message={ snackbarMessage } open={ snackbar } setOpen={ setSnackbar } />
            </div>
        </>
    )
}