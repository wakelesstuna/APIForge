import { Dispatch, SetStateAction, useState } from "react";
import { collections } from "../../../wailsjs/go/models";
import DialogModal from "../modal/Modal";

interface CollectionPropertiesButtonProps {
  collection: collections.Collection;
}

function CollectionPropertiesButton({
  collection,
}: CollectionPropertiesButtonProps) {
  const [isOpened, setIsOpened] = useState(false);
  console.log(collection);
  return (
    <>
      <button
        onClick={() => {
          setIsOpened(true);
        }}
      >
        Properties
      </button>
      <DialogModal
        title="Collection Properties"
        isOpened={isOpened}
        onProceed={() => {}}
        onProceedButtonText=""
        onClose={() => setIsOpened(false)}
        onCloseButtonText=""
        buttons={false}
        className="w-fit"
      >
        <div className="px-4 grid grid-cols-4 py-4">
          <p>Name:</p>
          <p className="col-span-3">{collection.name}</p>
          <p>Location:</p>
          <p className="col-span-3">{collection.collectionDir}</p>
        </div>
      </DialogModal>
    </>
  );
}

export default CollectionPropertiesButton;
