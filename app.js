const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const moment = require('moment'); // Para manipulação de data e hora

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Configuração do armazenamento de fotos
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const now = moment().format('DDMMYY-HHmm'); // Formato: 020924-0800
    const entryType = req.body.entryType || 'Entrada'; // Define se é 'Entrada' ou 'Saída'
    const extension = path.extname(file.originalname); // Obter a extensão do arquivo
    cb(null, `${now}_${entryType}${extension}`); // Nome do arquivo: 020924-0800_Entrada.jpg
  },
});
const upload = multer({ storage });

let db = [];

// Carregar o log existente, tratar caso o arquivo não exista ou esteja vazio
try {
  if (fs.existsSync('db.json')) {
    const data = fs.readFileSync('db.json', 'utf8');
    if (data) {
      db = JSON.parse(data);
    }
  }
} catch (error) {
  console.error('Erro ao carregar o banco de dados:', error);
  db = [];
}

// Serve a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Processa o upload da foto e registra a entrada
app.post('/log', upload.single('photo'), (req, res) => {
  const now = moment();
  const logEntry = {
    photo: req.file ? req.file.path : null,
    dateEntry: now.format('YYYY-MM-DD'),
    timeEntry: now.format('HH:mm:ss'),
    entry: req.body.entryType || 'Entrada',
    dateExit: null,
    timeExit: null,
    exit: null,
  };
  db.push(logEntry);
  fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
  logToFile(logEntry);
  res.send(`Registro de ${logEntry.entry.toLowerCase()} salvo com sucesso!`);
});

// Processa o registro de saída
app.post('/log-exit', upload.single('photo'), (req, res) => {
  const now = moment();
  const lastEntry = db[db.length - 1];

  if (lastEntry && !lastEntry.dateExit && !lastEntry.timeExit) {
    lastEntry.dateExit = now.format('YYYY-MM-DD');
    lastEntry.timeExit = now.format('HH:mm:ss');
    lastEntry.exit = 'Saída';
    lastEntry.photo = req.file ? req.file.path : lastEntry.photo; // Atualiza a foto com a de saída
    fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
    logToFile(lastEntry);
    res.send('Registro de saída salvo com sucesso!');
  } else {
    res.status(400).send('Erro: Nenhuma entrada recente encontrada.');
  }
});

// Função para logar em arquivo de texto
function logToFile(logEntry) {
  const logMessage = `
  Data de Entrada: ${logEntry.dateEntry} | Hora de Entrada: ${logEntry.timeEntry} | 
  Data de Saída: ${logEntry.dateExit || '---'} | Hora de Saída: ${logEntry.timeExit || '---'} | 
  Foto: ${logEntry.photo || '---'}
  `;
  fs.appendFileSync('log.txt', logMessage);
}

// Deleta fotos com mais de 1 mês
app.get('/clean', (req, res) => {
  const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  db = db.map(entry => {
    if (entry.photo && fs.statSync(entry.photo).birthtimeMs < oneMonthAgo) {
      fs.unlinkSync(entry.photo);
      entry.photo = null;
    }
    return entry;
  });
  fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
  res.send('Fotos antigas removidas!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
