import http from "k6/http"
import { check, sleep } from "k6"

export const options = {
  vus: 50, // Virtual users (concurrent connections)
  iterations: 500 // Total number of requests
}

export default function () {
  const res = http.get("http://localhost:3000/")
  check(res, {
    "status is 200": (r) => r.status === 200
  })
  // sleep(1) // Optional: Add a delay between requests
}
