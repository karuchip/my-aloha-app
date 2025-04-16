import { NextResponse, NextRequest } from "next/server"
import prisma from "../../../../../utils/prisma"

type DeleteRequestBody = {
  authorId: number
}

export async function DELETE(request: NextRequest, {params}:{params:{id:string}}) {
  const id = Number(params.id)
  const body:DeleteRequestBody = await request.json()

  try {
    const singleItem = await prisma.post.findUnique({
      where:{id}
    })

    if (singleItem){
      if (singleItem.authorId === body.authorId) {
        await prisma.post.delete({
          where: {id}
        })
        return NextResponse.json({message:"削除が成功しました"})
      }
    }else {
      return NextResponse.json({message:"該当の投稿がDBに存在しません"})
    }

  } catch(error) {
    console.error("Prismaエラー:" , error)
    return NextResponse.json({message:"削除に失敗しました"})
  }
}
