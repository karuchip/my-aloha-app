import Image from "next/image"
import Link from "next/link"
import dayjs from "dayjs"
import { Suspense } from "react"
import LikeCount from "../../../components/likeCount"
import Comment from "../../../components/comment"
import GoogleMap from "../../../components/googleMap"
import {Paper} from "@mui/material"
import {Typography} from "@mui/material"


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

export const dynamic = "force-dynamic"

const getSingleItem = async(id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/readsingle/${id}`)
  const jsonData = await response.json()
  const singleItem = await jsonData.singleItem
  return singleItem
}

const ReadSingleItem = async({params}:any) => {

  const singleItem:SingleItemTypes | null = await getSingleItem(params.id)


  if(!singleItem) {
    return <div>投稿が見つかりませんでした</div>
  }

  const createdAtFormatted = dayjs(new Date(singleItem.createdAt)).format("YYYY/MM/DD HH:mm")
  const updatedAtFormatted = dayjs(new Date(singleItem.updatedAt)).format("YYYY/MM/DD HH:mm")
  const postId = Number(singleItem.id)



  return(
    <div className="singleItemContainer">
      <div style={{ position: 'relative', width: '100%', height: '600px' }}>
        <Image
          src={singleItem.image}
          alt="item-image"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <div style={{width:"80vw", margin:"20px auto"}}>
        <div className="operationButtons">
          <LikeCount likeCount={singleItem.likeCount} id={singleItem.id} />
          <div className="editedDay">
            <p>作成日: {createdAtFormatted}</p>
            <p>更新日: {updatedAtFormatted}</p>
          </div>
        </div>
        <div className="postContent">
            <h1>{singleItem.title}</h1>
            {singleItem.author? (
              <p>by {singleItem.author.name}</p>
            ):(
              <p>by 未定</p>
            )}
            <p>{singleItem.description}</p>
        </div>
      </div>

      {/* google map表示 */}
      <div  style={{margin: "50px 0"}}>
        <Typography variant="h2"
          sx={{
            fontFamily: '"Kaushan Script", cursive',
            fontSize:"28px",
            color:"#5a8c68",
            display:"flex",
            justifyContent:"center"
          }}>

            Location

        </Typography>
        <div style={{display:"flex", justifyContent:"center"}}>
          <p style={{width:"content-fit"}}>場所: {singleItem.place}</p>
        </div>
        <Suspense fallback={<div>地図を読み込み中...</div>}>
          <GoogleMap lat={singleItem.lat} lng={singleItem.lon}/>
        </Suspense>
      </div>


      {/* コメント表示 */}
      <div style={{margin: "50px 0"}}>
        <Suspense fallback={<div>コメントを読み込み中...</div>}>
          <div style={{display:"flex", justifyContent:"center"}}>
          <Paper elevation={3} sx={{width:"100%", padding:"40px", margin:"0 0 20px 0"}}>
            <Typography variant="h2"
              sx={{
                fontFamily: '"Kaushan Script", cursive',
                fontSize:"28px",
                color:"#5a8c68",
                display:"flex",
                justifyContent:"center",
                marginBottom:"30px"
              }}>
              Comment
            </Typography>
            <Comment postId={singleItem.id}/>
          </Paper>

          </div>
        </Suspense>
      </div>
      <div className="backToList"><Link href={`/`} >一覧に戻る</Link></div>
      <div className="editDeleteButton">
        <div><Link href={`/post/update/${postId}`}>編集</Link></div>
        <div><Link href={`/post/delete/${postId}`}>削除</Link></div>
      </div>
    </div>
  )
}

export default ReadSingleItem
