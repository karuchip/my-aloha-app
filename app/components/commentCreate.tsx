import { useState } from "react";

type commentType = {
  loginUserId: string,
  postId: number,
  onCommentCreated: () => void
}

const CommentCreate = ({loginUserId, postId, onCommentCreated}:commentType)=>{

  const [comment, setComment] = useState("")

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    try{
      const response = await fetch (`/api/comment/createComment/${postId}`, {
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          comment: comment,
          postId: postId,
          userId: Number(loginUserId)
        })
      })

      const jsonData = await response.json()
      setComment("");
      onCommentCreated();
      alert(jsonData.message)

    }catch(error) {
      console.error(error)
      alert("コメントを追加できませんでした")
    }
  }

  return(

      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)}/>
          <button type="submit">コメントを追加</button>
        </form>
      </div>
  )
}

export default CommentCreate
