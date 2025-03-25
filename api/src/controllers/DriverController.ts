import {AppDataSource} from "../data-source";
import {Driver} from "../entities/Driver";

export class DriverController {
    private driverRepository = AppDataSource.getRepository(Driver)

    async findAll() {
        return this.driverRepository.find({ relations: ["car"] })
    }

    async findOne(id: number) {
        return this.driverRepository.findOne({
            where: { id },
            relations: ["car"]
        })
    }

    async createDriver(driverData: Partial<Driver>) {
        const driver = this.driverRepository.create(driverData)
        return this.driverRepository.save(driver)
    }

    async updateDriver(id: number, driverData: Partial<Driver>) {
        await this.driverRepository.update(id, driverData)
        return this.driverRepository.findOne({
            where: { id },
            relations: ["car"]
        })
    }

    async deleteDriver(id: number) {
        await this.driverRepository.delete(id)
    }
}