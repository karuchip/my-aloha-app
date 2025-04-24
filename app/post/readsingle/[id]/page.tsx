import Image from "next/image"
import Link from "next/link"
import dayjs from "dayjs"

type Props = {
  params: {
    id:string
  }
}

type SingleItemTypes = {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  title: string,
  description: string,
  image: string,
  likeCount: number,
  place: string,
  lat: number,
  lon: number,
  category: string,
  published: boolean,
  authorId: number,
  author: {
    id: number,
    name: string
  } | null
}

export const getSingleItem = async(id: string) => {
  const response = await fetch(`http://localhost:3000/api/post/readsingle/${id}`)
  const jsonData = await response.json()
  const singleItem = await jsonData.singleItem
  return singleItem
}

const ReadSingleItem = async({params}:Props) => {

  const singleItem:SingleItemTypes | null = await getSingleItem(params.id)


  if(!singleItem) {
    return <div>投稿が見つかりませんでした</div>
  }

  const createdAtFormatted = dayjs(new Date(singleItem.createdAt)).format("YYYY/MM/DD HH:mm")
  const updatedAtFormatted = dayjs(new Date(singleItem.updatedAt)).format("YYYY/MM/DD HH:mm")
  const postId = Number(singleItem.id)

  return(
    <div>
      <div>
        <Image src={singleItem.image} width={750} height={750} alt="item-image" priority />
      </div>
      <div>
          <p>mahalo: {singleItem.likeCount}</p>
          <div>
            <div><Link href={`/post/update/${postId}`}>編集</Link></div>
            <div><Link href={`/post/delete/${postId}`}>削除</Link></div>
          </div>
      </div>
      <div>
          <p>カテゴリー: {singleItem.category}</p>
          <h2>{singleItem.title}</h2>
          <p>{singleItem.description}</p>
          <p>作成日: {createdAtFormatted}</p>
          <p>更新日: {updatedAtFormatted}</p>
          {singleItem.author? (
            <p>作者: {singleItem.author.name}</p>
          ):(
            <p>作者: 未定</p>

          )}
          <p>場所: {singleItem.place}</p>
          <p>経度: {singleItem.lat}</p>
          <p>緯度: {singleItem.lon}</p>
      </div>
      <div><Link href={`/`}>一覧に戻る</Link></div>
    </div>
  )
}

export default ReadSingleItem
