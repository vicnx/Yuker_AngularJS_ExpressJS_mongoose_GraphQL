FROM ubuntu
WORKDIR /home/server/frontend
COPY . .

RUN apt update
RUN apt install -y nodejs
RUN apt install -y npm
RUN npm install -g gulp -y
RUN npm install
EXPOSE 4000

CMD ["gulp"]