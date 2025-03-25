import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Car} from "./Car";

@Entity()
export class Driver {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 200, nullable: false })
    name!: string

    @Column({ length: 20, nullable: false })
    rg!: string

    @Column({ length: 11, nullable: false })
    cpf!: string

    @Column({ length: 20, nullable: true })
    phone?: string

    @OneToOne(() => Car, { nullable: true })
    @JoinColumn()
    car?: Car
}