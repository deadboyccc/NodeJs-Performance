import express from "express"
const app = express()

function doWork(msDuration: number) {
  const start = Date.now()
  while (Date.now() - start < msDuration) {
    // Simulate work :|
  }
}

app.get("/", (req, res, next) => {
  doWork(5000)
  res.send("Hello World!")
})
app.listen(300)
