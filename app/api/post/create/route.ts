import { NextResponse, NextRequest } from "next/server"
import prisma from '../../../../utils/prisma'

export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log(body);

  try {
    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        image: body.image,
        likeCount: body.likeCount,
        lat: body.lat,
        lon: body.lon,
        published: body.published,
        authorId: body.authorId,  // authorIdを直接渡す
      }
    })
    return NextResponse.json({ success: true, post: newPost })

  } catch (error) {
    console.error('Prismaエラー:', error)
    return NextResponse.json({message: '投稿に失敗しました'})
  }
}
