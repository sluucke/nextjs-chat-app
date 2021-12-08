import Link from 'next/link'
import Layout from '../components/Layout'
import { FaArrowRight } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const IndexPage = () => {
  const router = useRouter()
  const [name, setName] = useState<string>()
  const onSubmit = (e: any) => {
    e.preventDefault()
    if(name) {
      localStorage.setItem('name', name)
      router.push('/chat')
    }
  }
  useEffect(() => {
    setName(localStorage.getItem('name'))
  }, [])

  return (
    <Layout title="ChatApp">
      <div id="content-footer" className="bg-white rounded-xl -mt-10 py-2 ">
        <form onSubmit={onSubmit} className="px-2 w-full">
          <label htmlFor="name" className="text-xl pt-2">Type your name</label>
          <input type="text" name="name" id="name" className="py-2 px-3 mt-2 ring-2 ring-purple-500 rounded-lg outline-none w-full" placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <button type="submit" className="flex items-center justify-center text-white rounded-lg bg-purple-500 w-full py-2 px-3 mt-2">Join in the room <FaArrowRight className="ml-2" /></button>
        </form>
      </div>
    </Layout>
  )
}

export default IndexPage
