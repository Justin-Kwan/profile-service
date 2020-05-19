"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterManager = void 0;
const os = require("os");
const cluster = require("cluster");
/**
 * class responsible for running node server in cluster
 * mode
 */
class ClusterManager {
    constructor() {
        this.cpuCount = os.cpus().length;
    }
    /**
     * starts multiple worker processes of passed in callback
     * function, based on cpu count of operating system
     * @param {function(void): void} - process to fork
     * @return {void}
     */
    spawnWorkers(callback) {
        if (cluster.isMaster) {
            for (let i = 0; i < this.cpuCount; ++i) {
                cluster.fork();
            }
            console.log(this.cpuCount + " workers running...");
        }
        else {
            callback();
            console.log(`Worker ${process.pid} started...`);
        }
    }
    /**
     * handles a single worker process shutting down by forking
     * a new worker process
     * @param {void}
     * @return {void}
     */
    handleWorkerShutdown() {
        cluster.on('exit', (worker, code, signal) => {
            console.log('Worker %d died by code/signal %s. Restarting worker...', worker.process.pid, signal || code);
            cluster.fork();
        });
    }
}
exports.ClusterManager = ClusterManager;
