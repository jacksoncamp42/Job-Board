import React, { ReactNode } from "react"
import Head from "next/head"
import Footer from "./Footer"
import Navbar from "./navBar"


type Props = { children?: ReactNode, title: string }


const Layout = ({ children, title }: Props) => (
  <div className="content">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Navbar />
    {children}
    <Footer />
  </div>)

export default Layout