import { collections } from "../../../wailsjs/go/models";
import { RemoveCollection } from "../../../wailsjs/go/main/App";
import DialogModal from "../modal/Modal";
import { useState } from "react";

interface CollectionDeleteButtonProps {
  collection: collections.Collection | collections.Item;
}

function CollectionDeleteButton({ collection }: CollectionDeleteButtonProps) {
  const [isOpened, setIsOpened] = useState(false);

  const remove = async () => {
    const resp = await RemoveCollection(collection.id);
    if (resp.status != 201) {
      alert(resp.error.messsage);
    }
  };
  return (
    <>
      <button onClick={() => setIsOpened(true)}>Remove</button>
      <DialogModal
        title="Warning"
        isOpened={isOpened}
        onProceed={remove}
        onProceedButtonText="Yes"
        onProceedButtonType="warning"
        onClose={() => setIsOpened(false)}
        onCloseButtonText="No"
        className="w-fit"
      >
        <div className="px-4 py-4">
          <p>You sure you wanna delete the collection?</p>
        </div>
      </DialogModal>
    </>
  );
}

export default CollectionDeleteButton;
