import {NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";


export async function GET(request: NextRequest, {params}:{params:{id:string}}){

  try {
    const postId = Number(params.id)
    const readAllComments = await prisma.postComments.findMany({
      where: {postId: postId},
      include: {user: true},
    })

    return NextResponse.json({message:"コメント一覧取得が完了しました", readAllComments:readAllComments})
  }catch(error) {
    console.error({message:"Prismaエラー", error})
    return NextResponse.json({message:"コメント一覧の取得が失敗しました"})
  }
}
