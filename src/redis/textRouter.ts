import express from "express"
import { createText, getTextById, getTexts } from "./textController"
const textRouter = express.Router()
textRouter.route("/").get(getTexts).post(createText)
textRouter.route("/:id").get(getTextById)
export default textRouter
