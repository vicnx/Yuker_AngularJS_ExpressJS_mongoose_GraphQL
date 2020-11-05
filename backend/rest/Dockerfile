FROM ubuntu
WORKDIR /home/server/rest
COPY . .

RUN apt update
RUN apt install -y nodejs
RUN apt install -y npm
RUN apt install -y mongodb
RUN npm install
EXPOSE 3000
# RUN service mongodb start
RUN chmod +x scriptrest.sh
CMD ["./scriptrest.sh"]