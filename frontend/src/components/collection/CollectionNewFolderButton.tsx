import React, { useState } from "react";
import DialogModal from "../modal/Modal";
import InputField from "../ui/InputField";

function CollectionNewFolderButton() {
  const [isOpened, setIsOpened] = useState(false);
  const [name, setName] = useState("");

  const onProceed = async () => {
    console.log("Creating collection named: " + name);
    //let resp = await CreateNewFolder(name, folderPath);
    setName("");
  };
  return (
    <>
      <button className="" onClick={() => setIsOpened(true)}>
        New folder
      </button>

      <DialogModal
        title="Add new folder"
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
          <InputField name="Name" value={name} setValue={setName} />
        </form>
      </DialogModal>
    </>
  );
}

export default CollectionNewFolderButton;
