import Link from 'next/link'
import Layout from '../components/Layout'
import { FaArrowRight } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { IMessage } from '../interfaces/IMessage'
import { io } from 'socket.io-client'
import axios from 'axios'

const ChatPage = () => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [connected, setConnected] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [chat, setChat] = useState<IMessage[]>([])
  const [user, setUser] = useState<string>('')
  useEffect((): any => {
    const name = localStorage.getItem('name') || ''
    setUser(name)
    if (!name) {
      router.push('/')
    }
    const socket = io('/', {
      path: "/api/socketio",
    })

    socket.on('connect', () => {
      setConnected(true)
    })
    socket.on('message', (data: IMessage) => {
      chat.push(data)
      setChat([...chat])
    })

    if (socket) return () => socket.disconnect()

  }, [])

  const sendMessage = async () => {
    if (message) {
      const msg: IMessage = {
        user,
        message
      }
      const res = await axios.post('/api/chat', msg)

      if (res.status == 201) {
        setMessage('')
      }
    }

    inputRef?.current?.focus()
  }
  return (
    <Layout title="ChatApp">
      <div id="content-footer" className="bg-white rounded-xl -mt-10 py-2">
        <h2 className="text-2xl font-bold px-2">Chat</h2>
        {/* <div className="flex flex-col justify-between"> */}
          <div id="chat" className="overflow-y-scroll px-2 flex flex-col">
            {chat.length ? (
              chat.map((msg, i) => (
                <div key={i} className={`relative flex ${msg.user == user ? 'self-end bg-gradient-to-r from-purple-600 to-purple-400 py-2 px-3 rounded-t-lg rounded-l-lg my-2 text-white text-start' : 'self-start bg-gradient-to-r from-indigo-600 to-indigo-400 py-2 px-3 rounded-t-lg rounded-r-lg my-2 text-white text-left'}`}>
                  {msg.user !== user && (
                    <span className="text-white">{msg.user}:&nbsp;</span>
                  )}
                  <p>{msg.message}</p>
                </div>
              ))
            ) : (
              <p className="text-lg">No chat messages</p>
            )}
          </div>
          <div className="flex items-center px-2">
            <input
              ref={inputRef}
              type="text"
              value={message}
              placeholder={connected ? "Type a message..." : "Connecting..."}
              disabled={!connected}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className="w-full rounded-l-lg ring-2 py-2 px-3 outline-none ring-purple-500"
            />
            <button
              className="bg-purple-500 py-3 px-3 rounded-r-lg shadow text-sm text-white h-full px-2"
              onClick={sendMessage}
              disabled={!connected}
            >
              SEND
            </button>
          </div>
        </div>

      {/* </div> */}
    </Layout>
  )
}

export default ChatPage
