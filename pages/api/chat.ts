import { NextApiRequest } from 'next';
import { NextApiResponseIO } from './../../interfaces/NextApiResponseIO';
import nc from 'next-connect'

const handler = nc()

handler.post((req: NextApiRequest, res: NextApiResponseIO) => {
  const { message, user } = req.body
  res?.socket?.server?.io?.emit('message', { message, user })

  res.status(201).json({ message, user })
})

export default handler