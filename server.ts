import express from 'express';
const app = express();
import cors from 'cors';
import lobbyRoutes from './routes/lobbyRoutes/lobbyRoutes';
import { ExpressPeerServer } from 'peer';

const PORT = process.env.PORT || 8000;
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());
app.use('/lobby', lobbyRoutes);

app.get('/', (req, res) => {
  res.send('Lobby server running');
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const peerServer = ExpressPeerServer(server, {
  path: '/peerjs',
  debug: 3,
  proxied: true,
  ssl: {
    key: '',
    cert: ''
  }
});

peerServer.on('connection', (client) => {
  console.log('🔌 PeerJS connection:', client.getId());
});

peerServer.on('disconnect', (client) => {
  console.log('❌ PeerJS disconnection:', client.getId());
});

app.use('/peerjs', peerServer); 