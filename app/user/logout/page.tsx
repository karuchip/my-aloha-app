"use client"
import {useEffect} from "react"
import {useRouter} from "next/navigation"
import { useAuthContext } from "@/app/AuthContext"

const Logout = () => {
  const {setLoginUserId, setLoginUserEmail} = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    setLoginUserId(null)
    setLoginUserEmail(null)
    localStorage.removeItem("token")

    alert("ログアウトしました")
    router.replace("/user/login")
  }, [])
  return null
}

export default Logout
