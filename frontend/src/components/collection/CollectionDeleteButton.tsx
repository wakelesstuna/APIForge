import { collections } from "../../../wailsjs/go/models";
import { RemoveCollection } from "../../../wailsjs/go/main/App";

interface CollectionDeleteButtonProps {
  collection: collections.Collection | collections.Item;
}

function CollectionDeleteButton({ collection }: CollectionDeleteButtonProps) {
  const remove = async () => {
    const resp = await RemoveCollection(collection.id);
    if (resp.status != 201) {
      alert(resp.error.messsage);
    }
  };
  return <button onClick={remove}>Remove</button>;
}

export default CollectionDeleteButton;
