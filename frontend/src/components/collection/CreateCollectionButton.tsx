import React, { useState } from "react";
import { CreateCollection } from "../../../wailsjs/go/main/App";
import Modal from "../modal/Modal";
import InputField from "../ui/InputField";

function CreateCollectionButton() {
  const [isOpened, setIsOpened] = useState(false);
  const [name, setName] = useState("");

  const onProceed = async () => {
    console.log("Creating collection named: " + name);
    let resp = await CreateCollection(name);
    alert(resp);
    setName("");
  };

  return (
    <>
      <button
        className="p-2 text-white border border-white rounded-md hover:text-opacity-80"
        onClick={() => setIsOpened(true)}
      >
        Create New Collection
      </button>

      <Modal
        title="Create new Collection"
        isOpened={isOpened}
        onProceed={onProceed}
        onClose={() => setIsOpened(false)}
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
      </Modal>
    </>
  );
}

export default CreateCollectionButton;
