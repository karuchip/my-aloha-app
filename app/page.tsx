"use client"
import * as React from "react"
import { useEffect, useState} from "react"
import dayjs from "dayjs"
import Link from "next/link"
import useAuth from "@/utils/useAuth"
import CategoryButtons from "./components/categoryButton"
import SortPost from "./components/sortPost"
import Image from "next/image"
//MUI
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid'
import { CardActionArea, CardHeader, CardMedia, CardContent, CardActions, Collapse, Box, TextField, Typography } from "@mui/material"
import ExpandMore from "./components/expandMore"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type AllItemTypes = {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  title: string,
  content: string,
  image: string,
  likeCount: number,
  lat: number,
  lon: number,
  place: string,
  published: boolean,
  category: string,
  authorId: number,
  author: {
    id: number,
    name: string
  }
}

export const dynamic = "force-dynamic"

const ReadAllItems = () => {
  const {loading, loginUserId} = useAuth(false)
  const [allItems, setAllItems] = useState<AllItemTypes[]>([])

  const [selectCategory, setSelectCategory] = useState<string|null> (null)
  const [searchWord, setSearchWord] = useState("")
  const [sortType, setSortType] = useState("new")
  const [expanded, setExpanded] = useState(false);

  const [likePostIds, setLikePostIds] = useState<string[]>([])

  //投稿一覧取得
  useEffect(() => {
    const fetchData = async()=>{
      const response = await fetch('/api/post/readall')
      const jsonData = await response.json()
      setAllItems(jsonData.allItems)
    }
    fetchData()
  }, [])


  //いいね済み投稿のid取得
  useEffect(() => {

    if (loading || !loginUserId) return

    const fetchLikePostId = async() => {
      const id = String(loginUserId)
      const response = await fetch(`/api/like/likePostId/${id}`)
      const jsonData = await response.json()
      const likePostId = jsonData.likePostIds
      setLikePostIds(likePostId)
    }
    fetchLikePostId()
  }, [loginUserId, loading])


  //検索タブの開閉
  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  }


  if (loading) {
    return <p>読み込み中...</p>
  }

  return(
    <div className="mainContainer">
      <Card sx={{ mb: 5 }}>
        <Box>
          <CardActions sx={{display: "flex", justifyContent: "center"}}>

            <Typography  sx={{ fontSize: "16px", mr: 1, color: "#5a8c68", fontWeight:"700" }}>
              検索・絞り込み・並び替え
            </Typography>

            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              >
                <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Grid
            container
            spacing={0}
            justifyContent="center"
            sx={{
              border:"2px solid #5a8c68",
              minWidth: "300px",
              maxWidth: "1000px",
              margin: "0 20px 20px 20px",
              padding: "20px",
              justifyContent: "center"
            }}>

              {/* 検索 */}
              <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
                <TextField
                  label="Search"
                  variant="standard"
                  onChange={(e) => setSearchWord(e.target.value)}
                  sx={{width: "300px", height:"40px", margin:"20px 0"}}
                  />
              </Box>


              {/* 並び替え */}
              <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
                <Typography variant="body1">並び替え</Typography>
                <SortPost sortType={sortType} setSortType={setSortType} />
              </Box>

              {/* カテゴリー */}
              <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
                <Typography variant="body1">カテゴリー</Typography>
                <CategoryButtons selectCategory={selectCategory} setSelectCategory={setSelectCategory}/>
              </Box>

            </Grid>
          </CardContent>
        </Collapse>

      </Card>



      {/* 一覧表示 */}
      <div>
        <Grid container spacing={{ mobile: 1, tablet: 1, laptop: 1 }} sx={{justifyContent:"center", alignItems:"flex-start"}}>
          {allItems
            .filter(item =>
              (!selectCategory || item.category === selectCategory) &&
              (!searchWord || item.title?.toLowerCase().includes(searchWord.toLowerCase()) || item.content?.toLowerCase().includes(searchWord.toLowerCase()))
            )
            .sort((a, b) => {
              if (sortType === "new") {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              } else if (sortType === "old") {
                return new Date(a.createdAt).getTime() -  new Date(b.createdAt).getTime()
              } else if (sortType === "likes") {
                return b.likeCount - a.likeCount
              } else {
                return 0;
              }
            })
            .map(item => {
              const createdAtFormatted = dayjs(new Date(item.createdAt)).format("YYYY/MM/DD HH:mm")
              const updatedAtFormatted = dayjs(new Date(item.updatedAt)).format("YYYY/MM/DD HH:mm")

              const isLiked = likePostIds.includes(String(item.id))

              const card = (
                <CardActionArea component={Link} href={`/post/readsingle/${item.id}`}>
                  <CardHeader
                    title={item.title}
                    subheader={`by ${item.author && item.author.name }`}
                  />

                  <CardMedia
                    component="img"
                    height="250"
                    image={item.image}
                    alt="image"
                  />

                  <CardContent>
                    <p>📍 {item.place}</p>

                    <div className="likePosition">
                      <div className={isLiked? "hasLiked" : "hasNotLiked"}>
                        <Typography sx={{ fontFamily: '"Kaushan Script", cursive', fontSize:14}}>
                          {isLiked ? (
                            <FavoriteIcon sx={{width:"16px", height:"16px"}}/>
                          ):(
                            <FavoriteBorderIcon sx={{width:"16px", height:"16px"}}/>
                          )}
                          <span>{item.likeCount}</span>
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </CardActionArea>
              )

              return(

                <Grid container spacing={{mobile: 1, tablet: 2, laptop: 3}}  key={item.id}>
                  <Box sx={{minWidth: 300, maxwidth: 400, margin:2}}>
                    <Card variant="outlined">{card}</Card>
                  </Box>
                </Grid>
                )
          })}
        </Grid>
      </div>
    </div>
  )

}

export default ReadAllItems
