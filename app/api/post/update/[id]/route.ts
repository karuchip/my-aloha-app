import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../utils/prisma"

type Body = {
  title: string,
  content: string,
  image: string,
  lat: number,
  lon: number,
  authorId: number
}

export async function PUT(request: NextRequest, {params}:{params:{id:string}}) {
  const body = await request.json() as Body
  const id = Number(params.id)
  try {

    const singleItem = await prisma.post.findUnique({
      where: {id}
    })
    if (singleItem) {

      //リクエストのauthorIdとDBのauthorIdが一致しているか？？
      if (singleItem.authorId === body.authorId) {

        await prisma.post.update({
          where: {id},
          data: {
            title: body.title,
            content: body.content,
            image: body.image,
            lat: body.lat,
            lon: body.lon,
          }
        })
        return NextResponse.json({message:"編集が完了しました"})

      } else {
        return NextResponse.json({message:"他の人が作成したアイテムです"})
      }
    }else {
      return NextResponse.json({message:"対象のアイテムが存在しません"})
    }


  }catch(error) {
    console.error('Prismaエラー', error)
    return NextResponse.json({message:"編集が失敗しました"})
  }
}
