import {AppDataSource} from "../data-source";
import {Car} from "../entities/Car";

export class CarController {
    private carRepository = AppDataSource.getRepository(Car)

    async findAll() {
        return this.carRepository.find()
    }

    async findOne(id: number) {
        return this.carRepository.findOne({ where: { id } })
    }

    async createCar(carData: Partial<Car>) {
        const car = this.carRepository.create(carData)
        return this.carRepository.save(car)
    }

    async updateCar(id: number, carData: Partial<Car>) {
        await this.carRepository.update(id, carData)
        return this.carRepository.findOne({ where: { id } })
    }

    async deleteCar(id: number) {
        await this.carRepository.delete(id)
    }
}