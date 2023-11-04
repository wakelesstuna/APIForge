import { collections } from "../../../wailsjs/go/models";
import { RenameCollection } from "../../../wailsjs/go/main/App";
import DialogModal from "../modal/Modal";
import InputField from "../ui/InputField";
import { useState } from "react";

interface CollectionRenameButtonProps {
  collection: collections.Collection;
}

function CollectionRenameButton({ collection }: CollectionRenameButtonProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [newName, setNewName] = useState(collection.name);

  const onProceed = async () => {
    const resp = await RenameCollection(newName, collection.id);
    if (resp.status != 200) {
      alert(resp.error.messsage);
    }
  };

  return (
    <>
      <button className="" onClick={() => setIsOpened(true)}>
        Rename
      </button>
      <DialogModal
        title="Rename Folder"
        isOpened={isOpened}
        onProceed={onProceed}
        onProceedButtonText="Rename"
        onClose={() => setIsOpened(false)}
        onCloseButtonText="Cancel"
      >
        <form
          className="px-6 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            onProceed();
            setIsOpened(false);
          }}
        >
          <InputField
            name="Folder name"
            value={newName}
            setValue={setNewName}
          />
        </form>
      </DialogModal>
    </>
  );
}

export default CollectionRenameButton;
