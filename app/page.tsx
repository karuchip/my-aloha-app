"use client"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import Link from "next/link"
import Image from "next/image"
import useAuth from "@/utils/useAuth"

type AllItemTypes = {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  title: string,
  content: string,
  image: string,
  likeCount: number,
  lat: number,
  lon: number,
  place: string,
  published: boolean,
  authorId: number,
  author: {
    id: number,
    name: string
  } | null
}

export const dynamic = "force-dynamic"

const ReadAllItems = () => {
  const {loading} = useAuth(false)
  const [allItems, setAllItems] = useState<AllItemTypes[]>([])

  useEffect(() => {
    const fetchData = async()=>{
      const response = await fetch("http://localhost:3000/api/post/readall")
      const jsonData = await response.json()
      setAllItems(jsonData.allItems)
    }
    fetchData()
  }, [])


  if (loading) {
    return <p>読み込み中...</p>
  }
  return(
    <div>
      {allItems.map(item => {
        const createdAtFormatted = dayjs(new Date(item.createdAt)).format("YYYY/MM/DD HH:mm")
        const updatedAtFormatted = dayjs(new Date(item.updatedAt)).format("YYYY/MM/DD HH:mm")

        return(

          <Link href={`/post/readsingle/${item.id}`} key={item.id}>
            <Image src={item.image} alt="item-image" width={300} height={300} priority></Image>
            <p>mahalo: {item.likeCount}</p>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            {/* <p>作成日: {createdAtFormatted}</p> */}
            <p>更新日: {updatedAtFormatted}</p>
            {item.author? (
              <p>作者: {item.author.name}</p>
            ):(
              <p>作者: 不明</p>

            )}
            <p>場所: {item.place}</p>
          </Link>
          )
      })}
    </div>
  )

}

export default ReadAllItems
