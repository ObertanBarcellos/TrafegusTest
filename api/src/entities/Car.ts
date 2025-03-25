import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Driver} from "./Driver";

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 7, nullable: false })
    plate!: string

    @Column({ length: 30, nullable: true })
    reindeer?: string

    @Column({ length: 20, nullable: false })
    model!: string

    @Column({ length: 20, nullable: false })
    brand!: string

    @Column({ nullable: false })
    year!: number

    @Column({ length: 20, nullable: false })
    color!: string

    @OneToOne(() => Driver, driver => driver.car)
    driver?: Driver
}