"use client"
import {useState} from "react"
import {Card, TextField, Button} from "@mui/material"


type SendBodyType = {
  name: string,
  email: string,
  password: string
}

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const body: SendBodyType ={
        name: name,
        email: email,
        password: password
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })

      const jsonData = await response.json()
      alert(jsonData.message)

    }catch(err){
      alert("ユーザー登録失敗")
    }
  }

  return(
    <div className="authContainer">
      <Card variant="outlined" className="authContent">
        <h2>ユーザー登録</h2>

        <form onSubmit={handleSubmit}>
          <div className="userFormItem">
            {/* <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" name="email" placeholder="email"/> */}
            <TextField
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              name="name"
              id="standard-basic"
              label="ニックネーム"
              variant="standard"
              className="userFormInput"
            />
            <TextField
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              name="email"
              id="standard-basic"
              label="メールアドレス"
              variant="standard"
              className="userFormInput"
            />
          </div>
          <div className="userFormItem">
            <TextField
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              name="password"
              id="standard-basic"
              label="パスワード"
              variant="standard"
              className="userFormInput"
            />
          </div>
          <div className="userAuthBtn">
            <Button type="submit" variant="contained">登録</Button>
          </div>

        </form>
      </Card>
    </div>
  )
}

export default Register
