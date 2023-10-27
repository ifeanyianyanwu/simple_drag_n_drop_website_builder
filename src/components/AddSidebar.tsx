import React, { ChangeEvent, DragEventHandler, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { LuHeading1, LuHeading4 } from "react-icons/lu";
import { RxBox, RxButton, RxContainer, RxSection } from "react-icons/rx";
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
    clone.setAttribute("key", `${Math.floor(Math.random() * 100000000)}`);
    setDraggedElement(clone);
  };

  return (
    <aside className="w-[120px] flex flex-col gap-6 max-h-full">
      <h1 className="text-2xl font-bold text-center">Add</h1>
      <div className="flex-grow flex flex-col gap-4  overflow-y-auto flex-shrink min-h-0">
        <div className="p-1">
          <h3 className="text-lg font-semibold mb-1 text-center">Structure</h3>
          <div className="grid gap-1">
            <div
              draggable
              onDragStart={handleDragStart}
              className="rounded-md cursor-grab text-xs px-4 py-1 grid place-items-center gap-1 text-center"
            >
              <RxContainer size={35} />
              Container
            </div>
            <div
              draggable
              onDragStart={handleDragStart}
              className="rounded-md cursor-grab text-xs px-4 py-1 grid place-items-center gap-1 text-center"
            >
              <RxSection size={35} />
              Section
            </div>
            <div
              draggable
              onDragStart={handleDragStart}
              className="rounded-md cursor-grab text-xs px-4 py-1 grid place-items-center gap-1 text-center"
            >
              <RxBox size={35} />
              Div Block
            </div>
          </div>
        </div>
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
