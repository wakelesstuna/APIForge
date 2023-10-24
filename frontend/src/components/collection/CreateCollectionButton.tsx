import { useState } from "react";
import Modal from "../modal/Modal";
import InputField from "../ui/InputField";
import InputLocation from "../ui/InputLocation";
import { backend } from "../../../wailsjs/go/models";
import { CreateCollection } from "../../../wailsjs/go/main/App";

function CreateCollectionButton() {
  const [isOpened, setIsOpened] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const onProceed = async () => {
    console.log("Creating collection named: " + name);
    let request = new backend.CreateCollectionRequest();
    request.name = name;
    request.path = location;
    let resp = await CreateCollection(request);
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
      </Modal>
    </>
  );
}

export default CreateCollectionButton;
