import { DeleteCollection } from "../../../wailsjs/go/main/App";
import { collections } from "../../../wailsjs/go/models";

interface RemoveCollectionProps {
  collection: collections.Collection | collections.Item;
}

function RemoveCollection({ collection }: RemoveCollectionProps) {
  const remove = async () => {
    const resp = await DeleteCollection(collection.id);
    if (resp.status != 204) {
      alert(resp.error.messsage);
    }
  };
  return <button onClick={remove}>Remove</button>;
}

export default RemoveCollection;
