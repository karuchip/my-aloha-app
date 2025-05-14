import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../../utils/prisma"



export async function GET( request: NextRequest, context : {params: {id: string}}) {
  const id = Number(context.params.id)

  try {
    const singleItem = await prisma.post.findUnique({
      where: {id},
      include:{
        author: true
      }
    })
    return NextResponse.json({message: "シングルアイテム読み取り成功", singleItem:singleItem})

  }catch (error) {
    console.error('Prismaエラー:', error)
    return NextResponse.json({message: "シングルアイテム読み取り失敗"})
  }
}
