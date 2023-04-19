import express, { Request, Response, NextFunction } from "express"
import { ErrorHandler } from "./middlewares/ErrorHandler"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

import routes from "./routes"

const app = express()

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json())
app.use(cookieParser())
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"))
app.use(cors({
    origin: true,
    credentials: true,
    exposedHeaders: ["token"]
}))

app.use("/api/v1/users", routes.UserRoute)
app.use("/api/v1/unverified-users", routes.UnverifiedUserRoute)
app.use("/api/v1/classes", routes.ClassRoute)
app.use("/api/v1/admin", routes.AdminRoute)
app.use("/api/v1/student", routes.StudentRoute)
app.use("/api/v1/subject", routes.SubjectRoute)
app.use("/api/v1/teacher", routes.TeacherRoute)

app.get("/api/v1", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Chatty Chat!" })
})

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Hello World!" })
})

app.use(ErrorHandler)

export default app
