import express from "express"
import { createTransaction, paymentTrasaction } from "../controllers/payment.doctor.controllers.js"
const router = express.Router()
router.post("/payment", createTransaction)
router.post("/transaction", paymentTrasaction)
export default router