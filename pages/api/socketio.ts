import { NextApiResponseIO } from '../../interfaces/NextApiResponseIO';
import type { NextApiRequest } from 'next';
import { Server as NetServer } from 'http';
import { Server as ServerIO } from 'socket.io'
export const config = {
  api: {
    bodyParser: false,
  }
}


export default function handler(req: NextApiRequest, res: NextApiResponseIO) {
  if (!res.socket.server.io) {
    console.log('[SOCKET.IO] New connection stablished')

    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: '/api/socketio',
    });
    res.socket.server.io = io
  }
  res.end()
}
