import { useState, DragEventHandler, useEffect, ChangeEvent } from "react";
import "./App.css";
import { createAndDownloadFile } from "./utils/createAndDownLoadFile";
import { LuHeading1, LuHeading4 } from "react-icons/lu";
import { TbTextSize } from "react-icons/tb";
import { FaRegImage } from "react-icons/fa6";
import { RxButton } from "react-icons/rx";
import { HiCursorClick } from "react-icons/hi";

function App() {
  const [draggedElement, setDraggedElement] = useState<any>();
  const [selectedElement, setSelectedElement] = useState<any>();
  const [buttonOptions, setButtonOptions] = useState<string>("blue-button");
  const [controlsType, setControlsType] = useState<string>();
  const [imageBlob, setImageBlob] = useState("");

  const handleDragOver: DragEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
  };

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

  const handleElementSelect = (e: any) => {
    const tag = e.target.classList;
    setSelectedElement(e.target);
    switch (tag[0]) {
      case "button":
        setControlsType(tag[0]);
        if (tag.length > 1) {
          setButtonOptions(tag[1]);
        }
        break;
      default:
        setControlsType(undefined);
        break;
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    if (!draggedElement.innerText) return;
    const elementType = draggedElement.innerText;
    const target = e.target;

    if (target.innerText === "Drop text content here")
      e.target.replaceChildren();

    draggedElement.setAttribute("contentEditable", true);
    draggedElement.addEventListener("drop", (e: any) => {
      e.preventDefault();
      e.stopPropagation();
    });

    switch (elementType) {
      case "Heading":
        draggedElement.className = "heading";
        draggedElement.setAttribute("contentEditable", true);
        break;
      case "Sub-Heading":
        draggedElement.className = "sub_heading";
        draggedElement.setAttribute("contentEditable", true);
        break;
      case "Text":
        draggedElement.className = "text";
        draggedElement.setAttribute("contentEditable", true);
        break;
      case "Button":
        draggedElement.className = "button";
        draggedElement.classList.add(buttonOptions);
        break;
      default:
        break;
    }

    draggedElement.addEventListener("click", handleElementSelect);
    target.appendChild(draggedElement);
  };

  const handleImageDrop = (e: any) => {
    if (draggedElement.innerText) return;
    e.target.replaceChildren();
    e.preventDefault();
    draggedElement.addEventListener("drop", (e: any) => {
      e.preventDefault();
      e.stopPropagation();
    });
    draggedElement.className = "image";
    e.target.appendChild(draggedElement);
  };

  useEffect(() => {
    if (selectedElement && selectedElement.classList.contains("button")) {
      selectedElement.classList.add(
        buttonOptions === "blue-button" ? "blue-button" : "light-button"
      );
      selectedElement.classList.remove(
        buttonOptions === "blue-button" ? "light-button" : "blue-button"
      );
    }
  }, [buttonOptions]);

  const handleDownloadCode = () => {
    const code = document.getElementById("sourceCode");
    const stylesheet = [...document.styleSheets[0].cssRules].slice(2);
    let cssCode = "";
    const htmlCode = `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
    ${code!.outerHTML}
    </body>
    </html>`;
    stylesheet.forEach((item) => (cssCode += item.cssText + "\n"));

    createAndDownloadFile(htmlCode, "index.html");
    createAndDownloadFile(cssCode, "styles.css");
  };

  return (
    <main className="min-h-screen flex flex-col gap-2 p-4">
      <div className="flex mb-3">
        <button
          className="bg-blue-600 rounded-md px-2 py-1 ml-auto"
          onClick={handleDownloadCode}
        >
          Download Code
        </button>
      </div>
      <section className="flex gap-4 flex-grow">
        <aside className="w-[120px] flex flex-col gap-6 min-h-full">
          <h1 className="text-2xl font-bold">Add</h1>
          <div className="flex-grow flex flex-col gap-4">
            <div className="p-1">
              <h3 className="text-lg font-semibold mb-1">Basic</h3>
              <div className="grid gap-1">
                <button
                  draggable
                  onDragStart={handleDragStart}
                  className="rounded-md cursor-grab text-xs px-4 py-1 grid place-items-center gap-1"
                >
                  <RxButton size={35} />
                  Button
                </button>
              </div>
            </div>
            <div className="p-1">
              <h3 className="text-lg font-semibold mb-1">Typography</h3>
              <div className="grid gap-1">
                <h1
                  draggable
                  onDragStart={handleDragStart}
                  className="rounded-md cursor-grab text-xs px-4 py-1 grid place-items-center gap-1"
                >
                  <LuHeading1 size={35} />
                  Heading
                </h1>
                <p
                  draggable
                  onDragStart={handleDragStart}
                  className="rounded-md cursor-grab text-xs px-4 py-1 grid place-items-center gap-1"
                >
                  <LuHeading4 size={35} />
                  Sub-Heading
                </p>
                <p
                  draggable
                  onDragStart={handleDragStart}
                  className="rounded-md cursor-grab text-xs px-4 py-1 grid place-items-center gap-1"
                >
                  <TbTextSize size={35} />
                  Text
                </p>
              </div>
            </div>
            <div className="p-1">
              <h3 className="text-lg font-semibold mb-1">Media</h3>
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
                    <p className="rounded-md cursor-grab text-xs px-4 py-1 grid place-items-center gap-1">
                      <FaRegImage size={35} />
                      Add image
                    </p>
                  )}
                </label>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-grow  max-w-full">
          <article
            id="sourceCode"
            className="flex-grow flex flex-col aspect-video"
          >
            <nav className="nav">
              <h3 className="nav_heading">My Website</h3>
              <ul className="nav_links">
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
              </ul>
            </nav>
            <section className="main_content">
              <div className="main_section">
                <div
                  className="text_area dashed_border"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <p>Drop text content here</p>
                </div>
              </div>
              <div className="secondary_section">
                <div
                  className="image_area dashed_border"
                  onDrop={handleImageDrop}
                  onDragOver={handleDragOver}
                >
                  <p>Drop image here</p>
                </div>
              </div>
            </section>
          </article>
        </main>

        <aside className="flex flex-col gap-6 w-[120px]">
          <h1 className="text-xl font-bold grid">Controls</h1>
          {controlsType === "button" ? (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-1">Variant</h3>
                <div className="flex gap-2 mb-2">
                  <input
                    type="radio"
                    name="button_variant"
                    id="blue-button"
                    checked={buttonOptions === "blue-button"}
                    onChange={(e) => setButtonOptions("blue-button")}
                  />
                  <label htmlFor="blue-button">Blue</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="button_variant"
                    id="light-button"
                    checked={buttonOptions === "light-button"}
                    onChange={(e) => setButtonOptions("light-button")}
                  />
                  <label htmlFor="light-button">Light</label>
                </div>
              </div>
            </>
          ) : (
            <div className="grid place-items-center mt-8 gap-2">
              <HiCursorClick size={28} />
              Select a button to activate this paanel
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

export default App;
