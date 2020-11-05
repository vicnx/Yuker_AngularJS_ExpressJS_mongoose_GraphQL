FROM ubuntu
WORKDIR /home/server/graphql
COPY . .

RUN apt update
RUN apt install -y nodejs
RUN apt install -y npm
RUN apt install -y mongodb
RUN npm install
EXPOSE 3001
# RUN service mongodb start

CMD service mongodb start && npm run dev