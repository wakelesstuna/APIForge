import React, { useState } from "react";
import DialogModal from "../modal/Modal";
import InputField from "../ui/InputField";
import { RenameCollection } from "../../../wailsjs/go/main/App";
import { collections } from "../../../wailsjs/go/models";

interface Props {
  collection: collections.Collection;
  currentFolderName: string;
}

function RenameCollectionButton({ currentFolderName, collection }: Props) {
  const [isOpened, setIsOpened] = useState(false);
  console.log("Rename: ", currentFolderName);
  const [newName, setNewName] = useState(currentFolderName);

  const onProceed = async () => {
    let resp = await RenameCollection(
      newName,
      "D:\\projects\\go-api-forge\\collections\\test"
    );
    setNewName("");
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
        onProceedButtonText="Create"
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

export default RenameCollectionButton;
