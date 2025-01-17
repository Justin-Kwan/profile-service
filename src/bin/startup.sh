#!/bin/bash

# start redis server with lru cache policy
redis-server --maxmemory 10mb --maxmemory-policy allkeys-lru --port 6380

# start node server in production mode
npm run start
