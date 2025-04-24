import Form from "./form"
import {getSingleItem} from "../../readsingle/[id]/page"


const DeleteItem = async({params}:{params:{id:string}}) => {
  const singleItem = await getSingleItem(params.id)

  return (
    <div>
      <h1>アイテム削除</h1>
      <p>下記の投稿を本当に削除しますか？</p>
      <Form id={params.id} singleItem={singleItem}/>
    </div>
  )
}

export default DeleteItem
