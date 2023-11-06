import { DeleteItem } from "../../../wailsjs/go/main/App";
import { collections } from "../../../wailsjs/go/models";

interface RemoveItemProps {
  collection: collections.Collection;
  item: collections.Item;
}

function RemoveItem({ collection, item }: RemoveItemProps) {
  const remove = async () => {
    const resp = await DeleteItem(collection.id, item.id);
    if (resp.status != 204) {
      alert(resp.error.messsage);
    }
  };

  return <button onClick={remove}>Remove</button>;
}

export default RemoveItem;
