import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../../utils/prisma"

type Params = {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  {params}: Params
 ) {
  const id = Number(params.id)

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
