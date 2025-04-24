"use client"
import {useState} from "react"
// アイテム作成成功後、画面遷移する
import {useRouter} from "next/navigation"
//ログイン状態の取得
import { useAuthContext } from "@/app/AuthContext"
//画像ダウンロードapi
import ImgInput from "../../components/imgInput"

const CreateItem = () => {

  const [title, setTitle] = useState("")
  const [place, setPlace] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  //アイテム作成後、画面遷移する
  const router = useRouter()
  //トークン解析後の情報を取得
  const {loginUserEmail, loginUserId} = useAuthContext()

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  try {
      const response = await fetch("http://localhost:3000/api/post/create", {
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: title,
          image: image,
          description: description,
          category: category,
          place: place,
          published: true,
          authorId: loginUserId
        })
      })

      const jsonData = await response.json()
      alert(jsonData.message)
      router.push("/")

    } catch(error) {
      alert("アイテム作成失敗")
    }

  }

  //loginUserId にトークン解析から取得したidがある場合にのみreturn
  if(loginUserId) {

    return (
      <div>
        <h1>アイテム作成</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="createTitle">タイトル</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" placeholder="タイトル" id="createTitle" required />

          <label htmlFor="createPlace">場所</label>
          <input value={place} onChange={(e)=>setPlace(e.target.value)} type="text" name="place" placeholder="場所" id="createPlace" required />

          <label htmlFor="createImage">画像</label>
          <ImgInput setImage={setImage}/>
          <input value={image} onChange={(e)=>setImage(e.target.value)} type="text" name="image" placeholder="画像" id="createImage" required disabled />

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

          <button>作成</button>

        </form>
      </div>
    )
  }
}

export default CreateItem
