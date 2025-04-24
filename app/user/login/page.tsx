"use client"
import {useState} from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/app/AuthContext"

type SendBodyType = {
  email: string,
  password: string
}

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const {setLoginUserId, setLoginUserEmail} = useAuthContext()

  const handleSubmit = async(e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const body:SendBodyType = {
      email: email,
      password: password
    }

    try{
      const response = await fetch("http://localhost:3000/api/user/login", {
        method:"POST",
        headers:{
          "Accept": "application/JSON",
          "Content-Type": "application/JSON"
        },
        body:JSON.stringify(body),
      })

      const jsonData = await response.json()
      localStorage.setItem("token", jsonData.token)

      setLoginUserEmail(jsonData.payload.email)
      setLoginUserId(jsonData.payload.id)

      alert(jsonData.message)
      router.replace("/")

    }catch(error){
      alert("ログイン失敗")
      console.error(error)
    }
  }

  return(
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス"/>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" name="password" placeholder="パスワード"/>
        <button>ログイン</button>
      </form>
    </div>
  )
}

export default Login
