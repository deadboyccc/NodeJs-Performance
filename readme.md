# Node.js Performance Benchmark

This project is a test benchmark of the Node.js process, involving various methods to optimize backend performance using clustering, worker threads, caching, and other scaling strategies.

## Features

- **Clustering**: Utilize multiple CPU cores to handle concurrent requests.
- **Worker Threads**: Offload CPU-intensive tasks to worker threads.
- **Caching**: Implement caching strategies to reduce load times.
- **Scaling Strategies**: Explore different methods to scale the application.

## Benchmarking Tools

- **k6**: A modern load testing tool to benchmark the performance.
- **Apache Benchmark (ab)**: A simple tool to test and run benchmarks.

## Monitoring and Visualization

- **PM2**: Use the PM2 npm package to view a beautiful UI showing performance metrics.

## Getting Started

1. **Install Dependencies**:
  ```bash
  npm install
  ```

2. **Run the Application**:
  ```bash
  npm start
  ```

3. **Run Benchmarks**:
  - Using k6:
    ```bash
    k6 run src/script.js
    ```
  - Using Apache Benchmark:
    ```bash
    ab -n 1000 -c 10 http://localhost:3000/
    ```

4. **Monitor Performance**:
  ```bash
  pm2 monit
  ```

## License

This project is licensed under the ISC License.