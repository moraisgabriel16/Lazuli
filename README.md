
<pre><div class="dark bg-gray-950 contain-inline-size rounded-md border-[0.5px] border-token-border-medium"><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-markdown"># Registro de Ponto e Presença de Colaboradores

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
</code></div></div></pre>

2. Instale as dependências:
   <pre><div class="dark bg-gray-950 contain-inline-size rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><div class="flex items-center"><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copiar código</button></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">npm install
   </code></div></div></pre>
3. Inicie o servidor:
   <pre><div class="dark bg-gray-950 contain-inline-size rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><div class="flex items-center"><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copiar código</button></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">node app.js
   </code></div></div></pre>
4. Acesse a aplicação no navegador:
   <pre><div class="dark bg-gray-950 contain-inline-size rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><div class="flex items-center"><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copiar código</button></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">http://localhost:3000
   </code></div></div></pre>

## Uso

### Registro de Entrada

1. Na página principal, selecione uma foto para o registro de entrada.
2. Clique no botão "Registrar Entrada".
3. A foto será renomeada e armazenada com o formato `DDMMYY-HHmm_Entrada.jpg`.

### Registro de Saída

1. Na página principal, selecione uma foto para o registro de saída.
2. Clique no botão "Registrar Saída".
3. A foto será renomeada e armazenada com o formato `DDMMYY-HHmm_Saida.jpg`.

### Limpeza de Fotos Antigas

* Acesse o endpoint `/clean` para remover fotos com mais de 1 mês de idade.

## Estrutura do Projeto

* `app.js`: Configuração do servidor Express e lógica principal.
* `public/`: Arquivos estáticos (HTML, CSS, JS).
* `uploads/`: Diretório onde as fotos são armazenadas.
* `db.json`: Armazena os registros de ponto.
* `log.txt`: Armazena o log de entrada e saída.

## Contribuição

1. Fork o repositório.
2. Crie um branch para sua feature (`git checkout -b feature/MinhaFeature`).
3. Commit suas mudanças (`git commit -am 'Adicionei MinhaFeature'`).
4. Push para o branch (`git push origin feature/MinhaFeature`).
5. Abra um Pull Request.
