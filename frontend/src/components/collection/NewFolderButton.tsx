import { CreateItem } from "../../../wailsjs/go/main/App";
import DialogModal from "../modal/Modal";
import InputField from "../ui/InputField";
import { collections } from "../../../wailsjs/go/models";
import { useState } from "react";

interface NewFolderButtonProps {
  collectionId: string;
  parentFolderId: string;
}

function NewFolderButton({
  parentFolderId,
  collectionId,
}: NewFolderButtonProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [name, setName] = useState("");

  const onProceed = async () => {
    let request = new collections.CreateItemRequest();
    request.collectionId = collectionId;
    request.parentFolderId = parentFolderId;
    request.name = name;
    request.type = "FOLDER";
    let resp = await CreateItem(request);
    if (resp.status != 201) {
      alert(resp);
    }
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

export default NewFolderButton;
