import Form from "./form"
import {getSingleItem} from "../../readsingle/[id]/page"


const DeleteItem = async({params}:{params:{id:string}}) => {
  const singleItem = await getSingleItem(params.id)

  return (
    <div className="postFormWrapper">
      <div className="deleteConfirmMsg">
        <h1>アイテム削除</h1>
        <p className="deleteConfirm">⚠️ 下記の投稿を本当に削除しますか？</p>
      </div>
        <Form id={params.id} singleItem={singleItem}/>
    </div>
  )
}

export default DeleteItem
