import express from "express"
import { createText, getTextbyId, getTexts } from "./textController"
const textRouter = express.Router()
textRouter.route("/").get(getTexts).post(createText)
textRouter.route("/:id").get(getTextbyId)
export default textRouter
