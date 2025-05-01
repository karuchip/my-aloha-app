"use client"
import {useState, useEffect} from "react"
import { useAuthContext } from "../AuthContext"

type likeCountProps = {
  likeCount: number
  id: number
}

export const dynamic = "force-dynamic"

const LikeCount = ({likeCount, id}:likeCountProps) => {
  const {loginUserId, loading} = useAuthContext()
  const [count, setCount] = useState<number>(likeCount)
  const [hasLiked, setHasLiked] = useState<boolean>(false)

  useEffect (() => {
    setCount(likeCount);
  }, [likeCount]);


  // 表示時
  useEffect (() => {
    //ログイン情報未取得時はreturn
    if (loading || !loginUserId) return

    const likedCheck = async() => {
      try {
        const response = await fetch(`/api/like/likedCheck/${id}/${loginUserId}`)
        const jsonData = await response.json()

        if(jsonData.hasLiked) {
          setHasLiked(true)
        }
      }catch(error) {
        console.error(error)
      }
    }
    likedCheck()
  }, [loginUserId, id, loading])


  //likeボタン押下時
  const handleSubmit = async() => {

    if(!loginUserId) {
      alert("ログインしてください")
      return
    }

    //UI上のlike数を+1
    setCount(prev => prev + 1)

    //API「addLikeUser」の呼び出し
    try {
      const addLikeRes = await fetch(`http://localhost:3000/api/like/addLikedUser/${id}/${loginUserId}`, {
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
      const addLikeData = await addLikeRes.json()

      //API「likeCountUpdate」の呼び出し
      if(addLikeData){
        setHasLiked(true)
        const countUpdateRes = await fetch(`http://localhost:3000/api/like/likeCountUpdate/${id}`, {
          method:"POST",
          headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        })
        const countUpdateData = await countUpdateRes.json()

        if (countUpdateData.updatedLikeCount !== undefined) {
          setCount(countUpdateData.updatedLikeCount)
          alert(countUpdateData.message)
        }
      } else {
        alert(addLikeData.message)
      }
    }catch(error) {
      console.error("Error:", error)
      alert("いいね失敗")
    }


  }

  return(
    <div>
      {hasLiked===false ? (
          <button onClick={handleSubmit}>{count} mahalo!!</button>
        ):(
        <button onClick={handleSubmit} disabled >{count} mahalo!!</button>
      )}
    </div>
  )
}

export default LikeCount
