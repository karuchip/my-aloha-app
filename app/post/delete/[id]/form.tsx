"use client"

import {useRouter} from "next/navigation"
import Image from "next/image"
import { useAuthContext } from "@/app/AuthContext"
import Link from "next/link"


type Props = {
  id:string
  singleItem: {
    title: string
    image: string
    description: string
    place: string
    category: string
    authorId: number
  }
}

const DeleteItem = ({id, singleItem}:Props) => {

  const router = useRouter()
  const {loginUserId} = useAuthContext()


  //削除formボタンが押下された時の処理
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try{
      const response = await fetch(`http://localhost:3000/api/post/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          authorId: Number(loginUserId)
        })
      })
      const jsonData = await response.json()
      console.log(jsonData)
      alert(jsonData.message)
      router.push("/")

    }catch(error) {
      console.error("error message: ", error)
      alert("削除が失敗しました")
    }
  }

  if(Number(loginUserId) ===  singleItem.authorId) {

    return(
      <div>
        <form onSubmit={handleSubmit}>
            <Image alt="画像" src={singleItem.image} width={750} height={750} />
            <h2>{singleItem.title}</h2>
            <p>{singleItem.description}</p>
            <p>場所: {singleItem.place}</p>
            <p>カテゴリー: {singleItem.category}</p>

            <button>削除</button>

        </form>
      </div>
    )

  } else {
    return (
      <div>
        <h1>削除権限がありません</h1>
        <Link href="/user/login">ログインする</Link>
        <Link href="/user/register">新規登録する</Link>
      </div>
    )
  }
}

export default DeleteItem
