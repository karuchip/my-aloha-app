import { NextResponse } from "next/server";
import prisma from '../../../../utils/prisma'

export async function POST(request:Request) {
  const body = await request.json()
  console.log(body)

  try {
    const newUser = await prisma.user.create({
      data: {
        email:body.email,
        name:body.name
      }
    })
    return NextResponse.json({success:true, register:newUser})
  }catch (error) {
    console.log('Prismaエラー:', error)
    return NextResponse.json({message: '投稿に失敗しました'})
  }
}

