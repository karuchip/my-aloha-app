"use client"

import Link from "next/link"
import { useAuthContext } from "../AuthContext"

//動的ファイルにて、データの更新時に直に更新する
export const dynamic = "force-dynamic"

const Header = () => {
  const {loginUserId} = useAuthContext()

    return (
      <header>
        <div>
          <Link href = "/">Aloha memories</Link>
          <p>あの瞬間をもう一度。ハワイで出会ったとっておきの景色を集めよう</p>
        </div>
        <div>
          {!loginUserId ? (
            <>
            <Link href="/user/register">新規登録</Link>
            <Link href="/user/login">ログイン</Link>
            </>
          ):(
            <>
              <Link href="/post/create">投稿する</Link>
              <Link href="/user/logout">ログアウト</Link>
            </>
          )}
        </div>
      </header>
    )
}

export default Header
