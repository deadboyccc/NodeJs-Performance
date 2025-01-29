import { NextFunction, Request, RequestHandler, Response } from "express"
import TextModel from "./textModel"

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
export const getTextbyId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const text = await TextModel.findById(req.params.id)
    if (!text) {
      res.status(404).json({ message: "Text not found" })
      return
    }
    res.status(200).json({ message: "Text retrieved successfully", data: text })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error retrieving text" })
  }
}
