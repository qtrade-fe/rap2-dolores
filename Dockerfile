FROM node:8.11.1-alpine

WORKDIR /app
RUN /bin/sh -c 'npm install -g serve'
EXPOSE 2281

ENTRYPOINT ["serve","."]