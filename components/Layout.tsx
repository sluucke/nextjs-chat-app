import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'ChatApp' }: Props) => (
  <div >
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="max-w-lg w-full m-auto min-h-screen h-full">
      <header className="pb-4 ">
        <nav className="bg-gradient-to-r from-purple-600 to-purple-400 py-2 px-3 pb-8 ">
          <Link href="/">
            <a className="text-white text-2xl font-bold">ChatApp</a>
          </Link>
        </nav>
      </header>
      {children}
      <footer className="w-full flex items-center justify-center" >
        <span>&copy; <Link href="https://github.com/sluucke"><a target="_blank" rel="noreferrer" className="hover:text-purple-600 transition-colors duration-200 ease-in-out">Sluucke</a></Link> - 2021</span>
      </footer>
    </div>
  </div>
)

export default Layout
