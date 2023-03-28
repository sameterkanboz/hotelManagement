FROM golang:1.19-alpine


WORKDIR /usr/src/app


RUN go install github.com/cosmtrek/air@latest

COPY . .
RUN go mod tidy

# FROM golang:1.19-alpine
# RUN mkdir /app
# ADD . /app
# WORKDIR /app
# RUN go build -o main .
# CMD [ "/app/main" ]

