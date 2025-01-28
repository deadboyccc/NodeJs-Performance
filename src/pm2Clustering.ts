import express from "express"

const app = express()

function doWork(msDuration: number) {
  const start = Date.now()
  while (Date.now() - start < msDuration) {
    // Simulate work :|
  }
}

app.get("/", (req, res, next) => {
  // doWork(5000)
  res.send("Hello World!")
})

// Worker process
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
