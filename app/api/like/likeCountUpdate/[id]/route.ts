import {NextResponse, NextRequest} from "next/server"
import prisma from "@/utils/prisma"

export async function POST(request:NextRequest, context:{params:{id:string}}) {

  try {

    const postId = Number(context.params.id)


    const updated = await prisma.post.update({
      where: {id: postId},
      data: {likeCount: {increment:1}}
    })

    const updatedLikeCount = updated.likeCount

    return NextResponse.json({
      message:"mahaloしました!!",
      updatedLikeCount:updatedLikeCount
    })

  }catch(error) {
    console.error('Prismaエラー', error)
    return NextResponse.json({message:"like+1が失敗しました"})
  }
}
