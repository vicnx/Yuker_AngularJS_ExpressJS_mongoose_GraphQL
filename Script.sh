#!/bin/bash
cd backend/graphql
sudo docker build -t yuker/graphql2 .
sudo docker run -d -p 7000:3001 yuker/graphql

cd ../rest
sudo docker build -t yuker/rest2 .
sudo docker run -d -p 7001:3000 yuker/rest

cd ../../frontend
sudo docker build -t yuker/frontend2 .
sudo docker run -d -p 7002:4000 yuker/frontend2