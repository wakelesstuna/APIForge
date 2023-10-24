import { Dispatch, SetStateAction, useRef } from "react";
import { Input } from "./Input";
import { SelectFolder } from "../../../wailsjs/go/main/App";

interface Props {
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function InputLocation({ name, value, setValue }: Props) {
  const folderInputRef = useRef(null);

  const handleFolderSelect = async () => {
    const folder = await SelectFolder();
    if (folder.length >= 1) {
      setValue(folder);
    }
  };

  return (
    <div className="relative w-full min-w-[200px]">
      <label>{name}</label>
      <Input
        className="cursor-pointer"
        value={value}
        ref={folderInputRef}
        readOnly={true}
        type="text"
        onClick={handleFolderSelect}
        dir="true"
      />
      <p
        className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer"
        onClick={handleFolderSelect}
      >
        Browse
      </p>
    </div>
  );
}

export default InputLocation;
