import express from "express"
import FileUpload from "express-fileupload"
import cors from "cors"
import UserRouter from "./routes/UserRoute.js"

const app = express();

app.use(cors())
app.use(express.json())
app.use(FileUpload())
app.use(express.static("public"))
app.use(UserRouter)

app.listen(5000, ()=> console.log('server up and running in http://localhost:5000'))