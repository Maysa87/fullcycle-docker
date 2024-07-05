FROM golang:1.22.3-alpine AS builder

WORKDIR /app

COPY go.mod ./

RUN go mod download

COPY . .

RUN go build -o fullcycle .

# Criando uma nova imagem a partir do scratch (imagem vazia) para manter o tamanho pequeno
FROM scratch

# Copiando o binário compilado da etapa anterior
COPY --from=builder /app/fullcycle /fullcycle

ENTRYPOINT ["/fullcycle"]
