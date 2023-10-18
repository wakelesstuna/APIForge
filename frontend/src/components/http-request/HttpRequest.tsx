import React, { ChangeEvent, FormEvent, useState } from "react";
import { SendRequest } from "../../../wailsjs/go/main/App";
import { cn } from "../../utils/tailwind.utils";
import { main } from "../../../wailsjs/go/models";

const httpMethods = [
  {
    id: "qwewqe131ewq",
    name: "GET",
    color: "text-green-500",
  },
  {
    id: "weqr42245-rf-43r-rf4",
    name: "POST",
    color: "text-yellow-500",
  },
  {
    id: "1",
    name: "PUT",
    color: "text-blue-500",
  },
  {
    id: "ew-f53656-rfs--eqadfad",
    name: "DELETE",
    color: "text-red-500",
  },
];

export default function HttpRequest() {
  const [response, setResponse] = useState("");
  const [textColor, setTextColor] = useState("text-green-500");

  function findCurrentColor(e: ChangeEvent<HTMLSelectElement>) {
    setTextColor(
      (_) =>
        httpMethods.find((method) => method.name === (e.target.value as string))
          ?.color ?? "text-white"
    );
  }

  function getFormData(e: FormEvent<HTMLFormElement>) {
    const temp = e.nativeEvent.target as unknown as [
      { value: string },
      { value: string }
    ];
    return {
      method: temp[0],
      url: temp[1],
    };
  }

  async function sendHttpRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = getFormData(e);
    let hr = new main.HttpRequest();
    hr.url = form.url.value;
    hr.method = form.method.value;
    console.log("Sending request to backend: ", hr);
    const resp = await SendRequest(hr);
    setResponse(resp);
  }

  return (
    <form className="flex space-x-2" onSubmit={(e) => sendHttpRequest(e)}>
      <div
        className={cn(
          "flex flex-1 items-center shadow appearance-none border border-slate-700 bg-slate-800 rounded h-10 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline",
          textColor
        )}
      >
        <select
          className="bg-transparent border-none focus:ring-0 focus:ring-offset-0 font-semibold cursor-pointer"
          onChange={(e) => findCurrentColor(e)}
        >
          {httpMethods.map((method) => (
            <option
              className={cn("bg-slate-800 accent-slate-600", method.color)}
              key={method.id}
              value={method.name}
            >
              {method.name}
            </option>
          ))}
        </select>
        <div className="w-[0.5px] h-full bg-gray-300 mx-2"></div>
        <input
          placeholder="Enter url..."
          className="bg-transparent border-none focus:ring-0 focus:ring-offset-0 flex-1 text-white"
          type="text"
        />
      </div>
      <button className="text-white font-semibold bg-blue-500 rounded-md px-4 py-2">
        Send
      </button>
    </form>
  );
}
