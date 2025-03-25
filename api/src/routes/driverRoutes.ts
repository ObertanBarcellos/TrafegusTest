import {Router} from "express";
import {DriverController} from "../controllers/DriverController";

const router = Router()
const driverController = new DriverController()

router.get("/", async (req, res) => {
    try {
        const drivers = await driverController.findAll()
        res.json(drivers)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const driver = await driverController.findOne(parseInt(req.params.id))
        if (driver) {
            res.json(driver)
        } else {
            res.status(404).json({ message: "Driver not found" })
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const newDriver = await driverController.createDriver(req.body)
        res.status(201).json(newDriver)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const updatedDriver = await driverController.updateDriver(parseInt(req.params.id), req.body)
        res.json(updatedDriver)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await driverController.deleteDriver(parseInt(req.params.id))
        res.status(204).send()
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

export default router