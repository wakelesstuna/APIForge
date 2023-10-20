import React, { Dispatch, SetStateAction } from "react";
import { Input } from "./Input";

interface Props {
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function InputField(props: Props) {
  return (
    <div className="relative w-full min-w-[200px]">
      <label>{props.name}</label>
      <Input
        placeholder=" "
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </div>
  );
}

export default InputField;
