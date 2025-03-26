import {Driver} from "../types/driver.ts";
import api from "./api.ts";

export const getDrivers = async (): Promise<Driver[]> => {
    try {
        const response = await api.get('/drivers')
        return response.data
    } catch (error) {
        console.error('Erro ao buscar motoristas:', error)
        throw new Error('Não foi possível carregar os motoristas')
    }
}

export const createDriver = async (driverData: Omit<Driver, 'id'>): Promise<Driver> => {
    try {
        if (!driverData.name || !driverData.cpf || !driverData.rg) {
            throw new Error('Nome, CPF e RG são obrigatórios')
        }

        const cpfRegex = /^\d{11}$/;
        if (!cpfRegex.test(driverData.cpf)) {
            throw new Error('CPF deve conter 11 dígitos')
        }

        const response = await api.post('/drivers', driverData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.status >= 200 && response.status < 300) {
            return response.data as Driver
        }

        throw new Error(`Erro ao cadastrar motorista: ${ response.statusText }`)
    } catch (error: any) {
        console.error('Erro no serviço createDriver:', error)
        throw error
    }
}

export const updateDriver = async (id: number, driverData: Partial<Driver>): Promise<Driver> => {
    try {
        if (!id) throw new Error('ID do motorista é obrigatório');

        if (driverData.cpf && !/^\d{11}$/.test(driverData.cpf)) {
            throw new Error('CPF deve conter 11 dígitos')
        }

        const response = await api.put(`/drivers/${ id }`, driverData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.status >= 200 && response.status < 300) {
            return response.data as Driver
        }

        throw new Error(`Erro ao atualizar motorista: ${ response.statusText }`)
    } catch (error: any) {
        console.error('Erro no serviço updateDriver:', error)
        throw error
    }
};

export const deleteDriver = async (id: number): Promise<void> => {
    try {
        const response = await api.delete(`/drivers/${ id }`)

        if (response.status >= 200 && response.status < 300) {
            return
        }

        throw new Error(`Erro ao deletar motorista: ${ response.statusText }`)
    } catch (error: any) {
        console.error('Erro na requisição de delete:', error)
        throw error
    }
}