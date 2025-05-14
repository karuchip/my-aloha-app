import {NextResponse, NextRequest} from "next/server"
import prisma from "@/utils/prisma"

export async function GET(request:NextRequest, context:{params:{id:string}}) {
  const userId = Number(context.params.id)
  try {
    const getLikePostId = await prisma.postLikes.findMany({
      where: {userId},
      select: {postId: true}
    })
    const likePostIds = getLikePostId.map((like => String(like.postId)))

    return NextResponse.json({message:"このユーザーがいいね済みの投稿ID一覧を取得しました", likePostIds:likePostIds})

  }catch(error) {
    console.error('Prismaエラー', error)
    return NextResponse.json({message: "いいね済みの投稿ID取得が失敗しました"})
  }
}
