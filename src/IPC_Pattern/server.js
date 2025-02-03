"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cluster_1 = require("cluster");
var os_1 = require("os");
var worker_threads_1 = require("worker_threads");
if (cluster_1.default.isPrimary) {
    console.log("Master ".concat(process.pid, " is running"));
    //creating workers
    var worker1_1 = new worker_threads_1.Worker("./workers/worker1.js");
    var worker2_1 = new worker_threads_1.Worker("./workers/worker2.js");
    // loggint their thread id
    console.log("Worker ".concat(worker1_1.threadId, " started")); // Use threadId for worker_threads
    console.log("Worker ".concat(worker2_1.threadId, " started"));
    // error handling for workers
    worker1_1.on("error", function (err) { return console.error("worker1 error: ".concat(err)); });
    worker2_1.on("error", function (err) { return console.error("worker2 error: ".concat(err)); });
    //msg event
    worker1_1.on("message", function (msg) { return console.log("worker1 sent to main: ".concat(msg)); });
    worker2_1.on("message", function (msg) { return console.log("worker2 sent to main: ".concat(msg)); });
    //fork 2 more processes (4 cores -2 workers = 2 processes to handle requests for the express app)
    cluster_1.default.on("online", function (w) {
        console.log("Worker ".concat(w.process.pid, " is online "));
        // if worker is online then check for their msgs
        w.on("message", function (num) {
            console.log("Worker ".concat(w.process.pid, " received message: ").concat(num));
            // sending the message to the main node thread
            if (num % 2 == 0) {
                worker1_1.emit(num);
            }
            else {
                worker2_1.emit(num);
            }
        });
    });
    for (var i = 0; i < os_1.cpus.length - 2; i++) {
        var worker = cluster_1.default.fork();
        // Logging the id of the fork pid
        console.log("Worker ".concat(worker.process.pid, " started"));
    }
}
else {
    // main node thread(2# cluster)
    var app = (0, express_1.default)();
    app.get("/", function (req, res) {
        process.send(req.query.number);
        console.log("pid: ".concat(process.pid, " recieved the request "));
        res.end("the end of the request!");
    });
    app.listen(3000, function () {
        console.log("Worker ".concat(process.pid, " started"));
    });
}
