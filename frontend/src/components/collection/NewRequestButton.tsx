import { CreateNewHttpRequest } from "../../../wailsjs/go/main/App";
import DialogModal from "../modal/Modal";
import InputField from "../ui/InputField";
import { collections } from "../../../wailsjs/go/models";
import { useState } from "react";

interface NewRequestButtonProps {
  collectionId: string;
  parentFolderId: string;
}

function NewRequestButton({
  parentFolderId,
  collectionId,
}: NewRequestButtonProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [name, setName] = useState("");

  const onProceed = async () => {
    let request = new collections.CreateNewHttpRequest();
    request.name = name;
    request.url = "http://test.se";
    request.method = "GET";
    request.collectionId = collectionId;
    request.parentFolderId = parentFolderId;

    let resp = await CreateNewHttpRequest(request);

    if (resp.status != 201) {
      alert(resp.error.messsage);
    }
    setName("");
  };

  return (
    <>
      <button className="" onClick={() => setIsOpened(true)}>
        New Request
      </button>

      <DialogModal
        title="New Request"
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

export default NewRequestButton;
