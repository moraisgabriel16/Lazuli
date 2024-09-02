# Registro de Ponto e Presença de Colaboradores

Este projeto é uma aplicação web simples para registro de ponto e presença de colaboradores, com funcionalidades para capturar fotos, registrar horários de entrada e saída, e gerar logs. A aplicação renomeia as fotos de acordo com a data e hora do upload, e distingue entre fotos de entrada e saída.

## Funcionalidades

- Registro de ponto com fotos.
- Renomeação automática das fotos para `DDMMYY-HHmm_Entrada.jpg` ou `DDMMYY-HHmm_Saida.jpg`.
- Armazenamento dos registros de entrada e saída em um arquivo JSON.
- Log dos registros em um arquivo de texto.
- Limpeza automática de fotos antigas (com mais de 1 mês).

## Tecnologias Utilizadas

- **Node.js**: Para o servidor backend.
- **Express.js**: Framework para construir a API REST.
- **Multer**: Middleware para lidar com uploads de arquivos.
- **Moment.js**: Para manipulação de datas e horários.
- **HTML/CSS**: Para a interface do usuário.

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   ```
