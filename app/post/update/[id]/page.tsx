"use client"

import Link from "next/link"
import Image from "next/image"
import {useState, useEffect, Suspense} from "react"
import {useRouter}from "next/navigation"
import { useAuthContext } from "@/app/AuthContext"
import PlaceAutocomplete from "../../../components/placeAutocomplete"

type Props = {
  params:{
    id: string
  }
}

const UpdateItem = ({params}:Props) => {

  const [postId, setPostId] = useState("")
  const [title, setTitle] = useState("")
  const [place, setPlace] = useState("")
  const [lat, setLat] = useState<number | null>(null)
  const [lng, setLng] = useState<number | null>(null)
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const {loginUserId} = useAuthContext()

  //場所autocomplete機能
  const handleSelectPlace = (lat: number, lng: number, name:string) => {
    setLat(isNaN(lat) ? null : lat)
    setLng(isNaN(lng) ? null : lng)
    setPlace(name)
  }

  //ページを開いたときの処理
  useEffect(() => {

    const getSingleItem = async() => {
      try{

        console.log("フェッチ中")

        const response = await fetch(`http://localhost:3000/api/post/readsingle/${params.id}`)
        const jsonData = await response.json()
        const singleItem = jsonData.singleItem

        setPostId(String(singleItem.id))
        setTitle(singleItem.title)
        setPlace(singleItem.place)
        setImage(singleItem.image)
        setDescription(singleItem.description)
        setCategory(singleItem.category)
        setAuthorId(singleItem.authorId)
        setLoading(true)

      }catch(error) {
        console.log("フェッチ失敗")
      }
      }

    getSingleItem()
  },[params.id])


  //編集formボタンが押下された時の処理
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try{

      const response = await fetch(`http://localhost:3000/api/post/update/${params.id}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: title,
          place: place,
          lat: lat,
          lon: lng,
          image: image,
          description: description,
          category: category,
          authorId: loginUserId
        })
      })
      const jsonData = await response.json()
      alert(jsonData.message)
      router.push("/")
    } catch(error) {
      alert("更新失敗")
    }
  }
  if(loading) {

    if (loginUserId === authorId) {
      return(
        <div>
          <h1>アイテム編集</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="createTitle">タイトル</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" placeholder="タイトル" id="createTitle" required />

            <label>場所
              <Suspense fallback={<div>場所を読み込み中...</div>}>
                <PlaceAutocomplete onSelectPlace={handleSelectPlace} defaultPlace={place}/>
              </Suspense>
            </label>

            <label htmlFor="createContent">詳細</label>
            <input value={description} onChange={(e=>setDescription(e.target.value))} type="text" name="description" placeholder="内容" id="createContent" required />

            <div>
              <h3>記事カテゴリー</h3>
              <input type="radio" value="food" checked={category === "food"} onChange={(e)=>setCategory(e.target.value)} name="category" id="categoryFood"/>
              <label htmlFor="categoryFood">食べ物</label>

              <input type="radio" value="activity" checked={category === "activity"} onChange={(e)=>setCategory(e.target.value)} name="category" id="categoryActivity"/>
              <label htmlFor="categoryActivity">アクティビティ</label>

              <input type="radio" value="shopping" checked={category === "shopping"} onChange={(e)=>setCategory(e.target.value)} name="category" id="categoryShopping"/>
              <label htmlFor="categoryShopping">買い物</label>

              <input type="radio" value="place" checked={category === "place"} onChange={(e)=>setCategory(e.target.value)} name="category" id="categoryPlace"/>
              <label htmlFor="categoryPlace">場所</label>

              <input type="radio" value="culture" checked={category === "culture"} onChange={(e)=>setCategory(e.target.value)} name="category" id="categoryCulture"/>
              <label htmlFor="categoryCulture">文化</label>

              <input type="radio" value="nature" checked={category === "nature"} onChange={(e)=>setCategory(e.target.value)} name="category" id="categoryNature"/>
            <label htmlFor="categoryNature">自然</label>

            <input type="radio" value="other" checked={category === "other"} onChange={(e)=>setCategory(e.target.value)} name="category" id="categoryOther"/>
            <label htmlFor="categoryOther">その他</label>
            </div>


            <Image src={image} alt="画像"  width={300} height={300} priority/>


            <button>編集</button>

          </form>
        </div>
      )
    }else {
      return (
        <>
          <h1>編集権限がありません</h1>
          <Link href="/user/login">ログインする</Link>
          <Link href="/user/register">新規登録する</Link>
        </>
      )
    }
  }else{
    return <h2>Loading...</h2>
  }
}

export default UpdateItem
