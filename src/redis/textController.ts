import { NextFunction, Request, RequestHandler, Response } from "express"
import { redisClient } from "./app"
import TextModel from "./textModel"
import { Console } from "console"

export const getTexts: RequestHandler = async (req, res, next) => {
  try {
    const texts = await TextModel.find()
    res.status(200).json({
      message: "Texts retrieved successfully",
      length: texts.length,
      data: texts
    })
  } catch (error) {
    res.status(500).json({ message: "Error retrieving texts" })
  }
}

export const createText = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const text = await TextModel.create(req.body)

    res.status(201).json({ message: "Text created successfully", data: text })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creating text" })
  }
}
export const getTextById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const textId = req.params.id
    if (!textId) {
      res.status(400).json({ message: "Text ID is required" })
      return
    }

    const cachedText = await redisClient.get(textId)
    if (cachedText) {
      res.status(200).json({
        message: "Text retrieved from cache successfully",
        data: JSON.parse(cachedText)
      })
      return
    }

    const text = await TextModel.findById(textId)
    if (!text) {
      res.status(404).json({ message: "Text not found" })
      return
    }

    res.status(200).json({ message: "Text retrieved successfully", data: text })
    await redisClient.set(textId, JSON.stringify(text))
  } catch (error) {
    console.error("Error retrieving text:", error)
    res.status(500).json({ message: "Error retrieving text" })
  }
}
