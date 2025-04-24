import { useState } from "react"

const ImgInput = (props:any ) => {
  const [imageFile, setImageFile] = useState("")

  const handleClick = async() => {
    try {
      const data = new FormData()
      data.append("file", imageFile)
      data.append("upload_preset", "karuchipalohaapp")
      data.append("cloud_name", "dwch7wlvi")
      const response = await fetch("https://api.cloudinary.com/v1_1/dwch7wlvi/image/upload", {method: "POST", body:data})
      const jsonData = await response.json()
      console.log(jsonData);
      console.log(jsonData.url);
      await props.setImage(jsonData.url)
      alert("画像アップロード成功")
    }catch(err) {
      alert("画像アップロード失敗")
    }
  }
  return (
    <div className="img-input">
      <input type="file" onChange={(e)=> setImageFile(e.target.files[0])} accept="image/png, image/jpg"/>
      <button onClick={handleClick} disabled={!imageFile}>画像 Upload</button>
    </div>
  )
}

export default ImgInput
