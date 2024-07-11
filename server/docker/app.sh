#!/bin/bash

while !</dev/tcp/db/5432; do sleep 1; done; 

gunicorn main:app --workers 1 --worker-class uvicorn.workers.UvicornWorker --forwarded-allow-ips='*' --bind=0.0.0.0:8000