"use client"
import {createContext, useState, useContext, ReactNode, Children} from "react"

//型定義
type AuthContextType = {
  loginUserId: string | null,
  setLoginUserId: (id: string | null) => void,
  loginUserEmail: string | null,
  setLoginUserEmail: (email: string | null) => void,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

//初期値（ここでは仮の関数を入れる）
const AuthContext = createContext<AuthContextType> ({
  loginUserId: null,
  setLoginUserId: () => {},
  loginUserEmail: null,
  setLoginUserEmail: () => {},
  loading: true,
  setLoading: () => {}
})

//Providerの定義
export const AuthProvider = ({children}:{children: ReactNode}) => {
  const [loginUserId, setLoginUserId] = useState<string | null>(null)
  const [loginUserEmail, setLoginUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  return (
    <AuthContext.Provider value={{ loginUserId, setLoginUserId, loginUserEmail, setLoginUserEmail, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

//呼び出しようのカスタムフック
export const useAuthContext = () => useContext(AuthContext)
