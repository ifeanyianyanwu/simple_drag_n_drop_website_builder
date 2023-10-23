import { useState, DragEventHandler, useEffect, ChangeEvent } from "react";
import "./App.css";
import { createAndDownloadFile } from "./utils/createAndDownLoadFile";

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
      <div className="flex ">
        <button className="ml-auto" onClick={handleDownloadCode}>
          Download Code
        </button>
      </div>
      <section className="flex gap-4 flex-grow">
        <aside className="w-[250px] flex flex-col gap-12 min-h-full">
          <h1 className="text-xl font-bold">Add</h1>
          <div className="flex-grow flex flex-col gap-7">
            <div className="p-1">
              <h3 className="text-lg font-semibold mb-1">Basic</h3>
              <div className="grid grid-cols-2 gap-1">
                <button
                  draggable
                  onDragStart={handleDragStart}
                  className="rounded-md bg-slate-600 cursor-pointer p-1"
                >
                  Button
                </button>
              </div>
            </div>
            <div className="p-1">
              <h3 className="text-lg font-semibold mb-1">Typography</h3>
              <div className="grid grid-cols-2 gap-1">
                <p
                  draggable
                  onDragStart={handleDragStart}
                  className="rounded-md bg-slate-600 cursor-pointer p-1"
                >
                  Heading
                </p>
                <p
                  draggable
                  onDragStart={handleDragStart}
                  className="rounded-md bg-slate-600 cursor-pointer p-1"
                >
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
                    <p className="rounded-md bg-slate-600 cursor-pointer p-2">
                      Add image
                    </p>
                  )}
                </label>
              </div>
            </div>
          </div>
        </aside>
        <article id="sourceCode" className="flex-grow flex flex-col">
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
                Drop text content here
              </div>
            </div>
            <div className="secondary_section">
              <div
                className="image_area dashed_border"
                onDrop={handleImageDrop}
                onDragOver={handleDragOver}
              >
                Drop image here
              </div>
            </div>
          </section>
        </article>
        <aside className="flex flex-col gap-8 w-[200px]">
          <h1 className="text-xl font-bold">Controls</h1>
          {controlsType === "button" ? (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-1">Button Variant</h3>
                <div className="px-10 flex gap-2 mb-2">
                  <input
                    type="radio"
                    name="button_variant"
                    id="blue-button"
                    checked={buttonOptions === "blue-button"}
                    onChange={(e) => setButtonOptions("blue-button")}
                  />
                  <label htmlFor="blue-button">Blue</label>
                </div>
                <div className="px-10 flex gap-2">
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
          ) : null}
        </aside>
      </section>
    </main>
  );
}

export default App;
