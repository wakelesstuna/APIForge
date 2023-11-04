import { useState } from "react";
import DialogModal from "../modal/Modal";
import InputField from "../ui/InputField";
import InputLocation from "../ui/InputLocation";
import { CreateCollection } from "../../../wailsjs/go/main/App";

function CreateCollectionButton() {
  const [isOpened, setIsOpened] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const onProceed = async () => {
    let resp = await CreateCollection(name, location);
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

      <DialogModal
        title="Create new Collection"
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
          <InputLocation
            name="Location"
            value={location}
            setValue={setLocation}
          />
        </form>
      </DialogModal>
    </>
  );
}

export default CreateCollectionButton;
