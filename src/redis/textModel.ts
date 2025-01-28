import mongoose from "mongoose"

interface ITextDocument {
  text: string
}

const mySchema = new mongoose.Schema<ITextDocument>({
  text: { type: String, required: true }
})

const TextModel = mongoose.model<ITextDocument>("MyModel", mySchema)

export default TextModel
