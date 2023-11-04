import { collections } from "../../../wailsjs/go/models";
import { RemoveCollection } from "../../../wailsjs/go/main/App";

interface RemoveButtonProps {
  collection: collections.Collection | collections.Item;
}

function RemoveButton({ collection }: RemoveButtonProps) {
  const remove = async () => {
    const resp = await RemoveCollection(collection.id);
  };
  return (
    <button className="" onClick={remove}>
      Remove
    </button>
  );
}

export default RemoveButton;
