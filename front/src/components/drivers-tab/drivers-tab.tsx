import './drivers-tab.scss'
import {deleteDriver, updateDriver} from "../../services/drivers.ts";
import {reactFormatter, ReactTabulator} from "react-tabulator";
import {IconButton, Tooltip} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriversActions from "./drivers-actions/drivers-actions.tsx";
import {createSelector} from "@reduxjs/toolkit";
import {selectDrivers} from "../../redux-store/selectors.ts";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {deleteDriverRedux, updateDriverRedux} from "../../redux-store/actions";
import {Driver} from "../../types/driver.ts";
import CustomSnackbar from "../snackbar/snackbar.tsx";
import {useState} from "react";

const selector = createSelector([ selectDrivers ], (drivers) => ({ drivers }))

export default function DriversTab() {
    const { drivers } = useSelector(selector, shallowEqual)
    const dispatch = useDispatch()
    const [ snackbar, setSnackbar ] = useState(false)
    const [ snackbarMessage, setSnackbarMessage ] = useState('')

    const ActionButtons = ({ cell }: any) => {
        const rowData = cell.getRow().getData();

        const handleEditDriver = async () => {
            try {
                await updateDriver(rowData.id, rowData)
                dispatch(updateDriverRedux(rowData.id, rowData))
                setSnackbarMessage('Motorista atualizado com sucesso')
                setSnackbar(true)
            } catch (err) {
                console.error(err)

                // @ts-ignore
                setSnackbarMessage(err?.message)
                setSnackbar(true)
            }
        }

        const handleDeleteDriver = async () => {
            try {
                const driverIndex = drivers.findIndex((driver: Driver) => driver.id === rowData.id)
                await deleteDriver(rowData.id)
                dispatch(deleteDriverRedux(driverIndex))
                setSnackbarMessage('Motorista excluido com sucesso')
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
                    <IconButton style={ { color: '#47c113' } } onClick={ handleEditDriver }>
                        <SaveAsIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={ 'Excluir' }>
                    <IconButton style={ { color: '#c11313' } } onClick={ handleDeleteDriver }>
                        <DeleteForeverIcon />
                    </IconButton>
                </Tooltip>
            </div>
        )
    }

    const columns = [
        { title: 'ID', field: 'id', sortable: false, headerSort: false, },
        { title: 'Nome', field: 'name', sortable: false, headerSort: false, editor: "input", headerFilter: "input" },
        { title: 'RG', field: 'rg', sortable: false, headerSort: false, editor: "input", headerFilter: "input" },
        { title: 'CPF', field: 'cpf', sortable: false, headerSort: false, editor: "input", headerFilter: "input" },
        {
            title: 'Telefone',
            field: 'phone',
            formatter: (cell: any) => {
                const phone = cell._cell?.value
                return phone && phone.length > 0 ? phone : 'Nenhum'
            },
            sortable: false,
            headerSort: false,
            editor: "input"
        },
        {
            title: 'Veiculo',
            field: 'car',
            formatter: (cell: any) => {
                const plate = cell._cell?.value?.plate
                return plate ?? 'Nenhum'
            },
            sortable: false,
            headerSort: false
        },
        {
            title: "Ações",
            field: "actions",
            formatter: reactFormatter(<ActionButtons />),
            sortable: false,
            headerSort: false,
            width: 150,
        }
    ]

    console.log(drivers)

    return (
        <>
            <div className={ 'drivers-tab' }>
                <DriversActions />
                <ReactTabulator
                    data={ drivers }
                    // @ts-ignore
                    columns={ columns }
                    layout={ 'fitColumns' }
                />
                <CustomSnackbar message={ snackbarMessage } open={ snackbar } setOpen={ setSnackbar } />
            </div>
        </>
    )
}