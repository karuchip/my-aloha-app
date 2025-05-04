"use client"

import "../app/globals.css"
import { ReactNode } from "react"
import Header from "./components/header"
import Footer from "./components/footer"
import { AuthProvider } from "./AuthContext"
import useAuth from "@/utils/useAuth"


const RootLayout = ({children}:{children:ReactNode}) => {
  useAuth(false)

  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Header/>
          {children}
          <Footer/>
        </body>
      </html>
    </AuthProvider>
  )
}

export default RootLayout
