import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request:NextRequest, {params}:{params: {id: string, loginUserId:string}}) {

  try {
    const {id, loginUserId} = params

    const checkLiked = await prisma.postLikes.findFirst({
      where: {
        postId: Number(id),
        userId: Number(loginUserId)
      }
    })

    //初めてのいいねだった場合
    if(checkLiked) {
      return NextResponse.json({hasLiked: true})
    } else {
      return NextResponse.json({hasLiked : false})
    }
  }catch(error) {
    console.error("prismaエラー",  error)
    return NextResponse.json({error: "サーバーエラーが発生しました"}, {status:500})
  }
}
