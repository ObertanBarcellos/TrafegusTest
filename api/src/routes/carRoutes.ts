import {Router} from "express";
import {CarController} from "../controllers/CarController";

const router = Router()
const carController = new CarController()

router.get("/", async (req, res) => {
    try {
        const cars = await carController.findAll()
        res.json(cars)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const car = await carController.findOne(parseInt(req.params.id))
        if (car) {
            res.json(car)
        } else {
            res.status(404).json({ message: "Car not found" })
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const newCar = await carController.createCar(req.body)
        res.status(201).json(newCar)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const updatedCar = await carController.updateCar(parseInt(req.params.id), req.body)
        res.json(updatedCar)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await carController.deleteCar(parseInt(req.params.id))
        res.status(204).send()
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

export default router