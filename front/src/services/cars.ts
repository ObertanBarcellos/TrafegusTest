import {Car} from "../types/car.ts";
import api from "./api.ts";

export const getCars = async (): Promise<Car[]> => {
    try {
        const response = await api.get('/cars')
        return response.data
    } catch (error) {
        console.error('Erro ao buscar carros:', error)
        throw error
    }
}

export const createCar = async (carData: Omit<Car, 'id'>): Promise<Car> => {
    try {
        if (!carData.plate || !carData.model || !carData.brand || !carData.year || !carData.color) {
            throw new Error('Todos os campos obrigatórios devem ser preenchidos')
        }

        const plateRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i;
        if (!plateRegex.test(carData.plate)) {
            throw new Error('Placa inválida. Formato esperado: AAA0000 ou AAA0A00');
        }

        const currentYear = new Date().getFullYear();
        if (carData.year < 1800 || carData.year > currentYear + 1) {
            throw new Error(`Ano deve estar entre 1800 e ${ currentYear + 1 }`)
        }

        const response = await api.post('/cars', carData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status >= 200 && response.status < 300) {
            return response.data as Car
        }

        throw new Error(`Erro ao cadastrar carro: ${response.statusText}`)
    } catch (error: any) {
        console.error('Erro no serviço createCar:', error)
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Erro ao cadastrar carro. Por favor, tente novamente.'
        )
    }
}

export const updateCar = async (id: number, carData: Partial<Omit<Car, 'id'>>): Promise<Car> => {
    try {
        if (!carData.plate || !carData.model || !carData.brand || !carData.year || !carData.color) {
            throw new Error('Todos os campos obrigatórios devem ser preenchidos');
        }

        const plateRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i;
        if (!plateRegex.test(carData.plate)) {
            throw new Error('Placa inválida. Formato esperado: AAA0000 ou AAA0A00');
        }

        const currentYear = new Date().getFullYear();
        if (carData.year < 1800 || carData.year > currentYear + 1) {
            throw new Error(`Ano deve estar entre 1800 e ${ currentYear + 1 }`)
        }

        const response = await api.put(`/cars/${ id }`, carData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.status >= 200 && response.status < 300) {
            return response.data as Car;
        }

        throw new Error(`Erro ao editar carro: ${response.statusText}`);
    } catch (error: any) {
        console.error('Erro no serviço updateCar:', error);
        throw error
    }
}

export const deleteCar = async (id: number): Promise<void> => {
    try {
        const response = await api.delete(`/cars/${ id }`)

        if (response.status >= 200 && response.status < 300) {
            return
        }

        throw new Error(`Erro ao deletar carro: ${response.statusText}`)
    } catch (error) {
        console.error('Erro na requisição de delete:', error)
        throw error
    }
}