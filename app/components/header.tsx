"use client"

import Link from "next/link"
import { useAuthContext } from "../AuthContext"
import {Typography, Button} from "@mui/material"

//動的ファイルにて、データの更新時に直に更新する
export const dynamic = "force-dynamic"

const Header = () => {
  const {loginUserId, loginUserName} = useAuthContext()

    return (
      <header>
        <div className="headerContainer">
          <div>
            <Typography variant="h1" sx={{ fontFamily: '"Kaushan Script", cursive', fontSize:50}}>
              <Link href = "/" className="headerLogo">Aloha memories</Link>
            </Typography>
            <p className="logoSub">あの瞬間をもう一度。ハワイで出会ったとっておきの景色を集めよう</p>
          </div>
          <div className="headerRight">
            {!loginUserId ? (
              <div className="notLoginNav">
              <Link href="/user/register">新規登録</Link>
              <Link href="/user/login">ログイン</Link>
              </div>
            ):(
              <>
                <p>ようこそ、 {loginUserName} さん</p>
                <Link href="/post/create">
                  <Button variant="contained" sx={{margin:"10px 0 0 10px", backgroundColor:"#f06543", fontWeight: 700}}> ＋ 投稿</Button>
                </Link>

                <Link href="/user/logout" className="logoutBtn">ログアウト</Link>
              </>
            )}
          </div>
        </div>
      </header>
    )
}

export default Header
