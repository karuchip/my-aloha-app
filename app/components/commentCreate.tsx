"use client"

import { useState } from "react";
import { TextField, Button } from "@mui/material";

type commentType = {
  loginUserId: string,
  postId: number,
  onCommentCreated: () => void
}

const CommentCreate = ({loginUserId, postId, onCommentCreated}:commentType)=>{

  const [comment, setComment] = useState("")

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    console.log("コメントボタンが押されました")
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

      <div style={{display:"flex", justifyContent:"center"}}>
        <form onSubmit={handleSubmit}>
            <TextField
              label="コメントを書く"
              variant="standard"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{width: "70vw"}}
              />
          <Button type="submit" variant="contained" sx={{margin:"10px 0 0 10px"}}>追加</Button>
        </form>
      </div>
  )
}

export default CommentCreate
