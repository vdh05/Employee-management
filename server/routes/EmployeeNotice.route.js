import express from "express"
import { HandleEmployeeNotices } from "../controllers/Notice.controller.js"
import { VerifyEmployeeToken } from "../middlewares/Auth.middleware.js"

const router = express.Router()

router.get("/my-notices", VerifyEmployeeToken, HandleEmployeeNotices)

export default router
