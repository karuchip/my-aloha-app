import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../../utils/prisma"

type Params = {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, {params}: Params ) {
  const id = Number(params.id)

  try {
    const singleItems = await prisma.post.findUnique({
      where: {id}
    })
    console.log(singleItems);
    return NextResponse.json({message: "シングルアイテム読み取り成功", singleItems:singleItems})

  }catch (error) {
    console.error('Prismaエラー:', error)
    return NextResponse.json({message: "シングルアイテム読み取り失敗"})
  }
}
