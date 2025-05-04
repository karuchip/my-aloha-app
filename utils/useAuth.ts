"use client"
import {useState, useEffect} from "react"
import {useRouter} from "next/navigation"
import {jwtVerify} from "jose"
import { useAuthContext } from "@/app/AuthContext"


const useAuth = (shouldRedirect = true) => {
  const router = useRouter()
  const {
    loginUserId,
    loginUserEmail,
    setLoginUserId,
    setLoginUserEmail
  } = useAuthContext()
  const {loading, setLoading} = useAuthContext()

  useEffect(() => {

    const checkToken = async()=> {

      const token = localStorage.getItem("token")

      if(!token) {
        if(shouldRedirect) router.push("/user/login")
        setLoading(false)
        return
      }

      try {
        const secretKey = new TextEncoder().encode("my-aloha-app-book")
        const decodedJwt = await jwtVerify(token, secretKey)
        const payload = decodedJwt.payload as {email: string, id:string}
        setLoginUserEmail(payload.email)
        setLoginUserId(payload.id)
      }catch(error) {
        console.error("トークン検証失敗:", error)
        if(shouldRedirect) router.push("/user/login")
      }finally {
        setLoading(false)
      }
    }

    checkToken()

  }, [router, shouldRedirect, setLoginUserEmail, setLoginUserId])

  return {
    loginUserEmail,
    loginUserId,
    setLoginUserEmail,
    setLoginUserId,
    loading,
    setLoading
  }
}

export default useAuth
