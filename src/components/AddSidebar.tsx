import React, { ChangeEvent, DragEventHandler, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { LuHeading1, LuHeading4 } from "react-icons/lu";
import { RxButton } from "react-icons/rx";
import { TbTextSize } from "react-icons/tb";

type Props = {
  setDraggedElement: React.Dispatch<any>;
};

export const AddSidebar = ({ setDraggedElement }: Props) => {
  const [imageBlob, setImageBlob] = useState("");

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const file = files[0];
      const imageSrc = URL.createObjectURL(file);
      setImageBlob(imageSrc);
    }
  };

  const handleDragStart: DragEventHandler<HTMLElement> = (e: any) => {
    const clone = e.target.cloneNode(true);
    const innerText = clone.innerText;
    clone.replaceChildren(innerText);
    clone.removeEventListener("dragstart", handleDragStart);
    clone.setAttribute("draggable", false);
    setDraggedElement(clone);
  };

  return (
    <aside className="w-[120px] flex flex-col gap-6 min-h-full">
      <h1 className="text-2xl font-bold text-center">Add</h1>
      <div className="flex-grow flex flex-col gap-4">
        <div className="p-1">
          <h3 className="text-lg font-semibold mb-1 text-center">Basic</h3>
          <div className="grid gap-1">
            <button
              draggable
              onDragStart={handleDragStart}
              className="rounded-md cursor-grab text-xs px-4 py-1 grid place-items-center gap-1 text-center"
            >
              <RxButton size={35} />
              Button
            </button>
          </div>
        </div>
        <div className="p-1">
          <h3 className="text-lg font-semibold mb-1 text-center">Typography</h3>
          <div className="grid gap-1">
            <h1
              draggable
              onDragStart={handleDragStart}
              className="rounded-md cursor-grab text-xs px-4 py-1 grid place-items-center gap-1 text-center"
            >
              <LuHeading1 size={35} />
              Heading
            </h1>
            <h4
              draggable
              onDragStart={handleDragStart}
              className="rounded-md cursor-grab text-xs px-4 py-1 grid place-items-center gap-1 text-center"
            >
              <LuHeading4 size={35} />
              Sub-Heading
            </h4>
            <p
              draggable
              onDragStart={handleDragStart}
              className="rounded-md cursor-grab text-xs px-4 py-1 grid place-items-center gap-1 text-center"
            >
              <TbTextSize size={35} />
              Text
            </p>
          </div>
        </div>
        <div className="p-1">
          <h3 className="text-lg font-semibold mb-1 text-center">Media</h3>
          <div className="grid gap-1">
            <input
              accept="image/*"
              type="file"
              id="imgOne"
              name="imageOne"
              required
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="imgOne" className="flex justify-center">
              {imageBlob ? (
                <img
                  height={100}
                  width={100}
                  alt="Image"
                  src={imageBlob || ""}
                  draggable
                  onDrag={handleDragStart}
                />
              ) : (
                <p className="rounded-md cursor-grab text-xs px-4 py-1 grid place-items-center gap-1 text-center">
                  <FaRegImage size={35} />
                  Add image
                </p>
              )}
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};
