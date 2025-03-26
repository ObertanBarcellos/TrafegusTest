import './tables-tabs.scss'
import {useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import {a11yProps, CustomTabPanel} from "../../utils/tabs.tsx";
import CarsTab from "../../components/cars-tab/cars-tab.tsx";
import DriversTab from "../../components/drivers-tab/drivers-tab.tsx";

export default function TablesTabs() {
    const [ value, setValue ] = useState<number>(0)

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(newValue)
    }

    return (
        <>
            <Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
                <Tabs
                    value={ value }
                    onChange={ handleChange }
                    aria-label="basic tabs example"
                    variant="fullWidth"
                >
                    <Tab label="Veiculos" {...a11yProps(0)} />
                    <Tab label="Motoristas" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={ value } index={ 0 }>
                <CarsTab />
            </CustomTabPanel>
            <CustomTabPanel value={ value } index={ 1 }>
                <DriversTab />
            </CustomTabPanel>
        </>
    )
}