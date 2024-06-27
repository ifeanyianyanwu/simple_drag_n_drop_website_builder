import {
  DragEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { AddSidebar } from "./AddSidebar";
import { ControlsSidebar } from "./ControlsSidebar";
import { createAndDownloadFile } from "../utils/createAndDownLoadFile";
import { useNavigate, useParams } from "react-router-dom";

export type LOCAL_TEMPLATE = { id: string; html: string };
type DargHandler = DragEventHandler<HTMLElement>;
type ClickHandler = MouseEventHandler<HTMLElement>;
export type SECTION_OPTIONS = {
  color: string;
  layout: string;
};
export type DIV_OPTIONS = {
  color: string;
  flow: string;
};

export const Template = () => {
  //App State
  const [formData, setFormData] = useState("");
  const [selectedElement, setSelectedElement] = useState<HTMLElement>();
  const [draggedElement, setDraggedElement] = useState<HTMLElement>();
  const [buttonOptions, setButtonOptions] = useState<string>("blue-button");
  const [containerOptions, setContainerOptions] =
    useState<string>("bg-transparent");
  const [sectionOptions, setSectionOptions] = useState<SECTION_OPTIONS>({
    color: "bg-transparent",
    layout: "single-column",
  });
  const [divOptions, setDivOptions] = useState<DIV_OPTIONS>({
    color: "bg-transparent",
    flow: "vertical",
  });
  const [controlsType, setControlsType] = useState<string>();
  //===End=====

  const navigate = useNavigate();

  //Get and update the canvas to locally stored template by route id
  const templates: [] = JSON.parse(localStorage.templates);
  const params = useParams();
  useEffect(() => {
    const container = document.getElementById("container");
    const temp: LOCAL_TEMPLATE = templates.filter(
      (item: LOCAL_TEMPLATE) => item.id === params.id
    )[0];
    if (temp && container) container.innerHTML = temp.html;
    const source = document.getElementById("source");
    // source?.addEventListener("dragover", handleDragOver as any);
    // source?.addEventListener("drop", handleDrop as any);
    source;
  }, []);
  //====End=====

  //Perform side effect(change class name) of selected element when user selects different option
  useEffect(() => {
    if (!selectedElement) return;
    if (selectedElement.classList.contains("div")) {
      selectedElement.className = `div ${divOptions.color} ${divOptions.flow}`;
    } else if (selectedElement.classList.contains("container")) {
      selectedElement.className = `container ${containerOptions}`;
    } else if (selectedElement.classList.contains("section")) {
      selectedElement.className = `section ${sectionOptions.color} ${sectionOptions.layout}`;
    } else if (selectedElement.classList.contains("button")) {
      selectedElement.className = `button ${buttonOptions}`;
    } else return;
  }, [divOptions, containerOptions, sectionOptions, buttonOptions]);
  //====End=====

  const handleDragOver: DargHandler = (e) => {
    e.preventDefault();
  };

  const handleDelete: ClickHandler = (e) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    let element = target.parentNode!;
    target.parentNode!.parentNode!.removeChild(element);
  };

  const handlePreventDrop: DargHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleElementSelect: ClickHandler = (e) => {
    const target = e.target as HTMLElement;
    const classList = target.classList;
    setSelectedElement(target);
    setControlsType(classList[0]);

    switch (classList[0]) {
      case "button":
        setButtonOptions(classList[1]);
        break;
      case "container":
        setContainerOptions(classList[1]);
        break;
      case "section":
        setSectionOptions(() => ({
          color: classList[1],
          layout: classList[2],
        }));
        break;
      case "div":
        setDivOptions(() => ({
          color: classList[1],
          flow: classList[2],
        }));
        break;
      default:
        setControlsType(undefined);
        setButtonOptions("blue-button");
        setSectionOptions({ color: "bg-transparent", layout: "double-column" });
        break;
    }
  };

  const handleDrop: DragEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (!draggedElement?.innerText) {
      handleImageDrop(e);
      return;
    }

    const target = e.target as HTMLElement;
    const elementType = draggedElement.innerText;

    const deleteButton = document.createElement("span");
    deleteButton.innerHTML = "⨯";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", handleDelete as any);
    draggedElement.appendChild(deleteButton);

    if (
      elementType === "Heading" ||
      elementType === "Sub-Heading" ||
      elementType === "Text" ||
      elementType === "Button"
    ) {
      draggedElement.addEventListener("drop", handlePreventDrop as any);
      draggedElement.setAttribute("contentEditable", "true");
    }

    switch (elementType) {
      case "Heading":
        draggedElement.className = "heading";
        break;
      case "Sub-Heading":
        draggedElement.className = "sub_heading";
        break;
      case "Text":
        draggedElement.className = "text";
        break;
      case "Button":
        draggedElement.className = `button ${buttonOptions}`;
        break;
      case "Container":
        draggedElement.className = `container ${containerOptions}`;
        draggedElement.innerHTML = "";
        break;
      case "Section":
        draggedElement.className = `section ${sectionOptions.color} ${sectionOptions.layout}`;
        draggedElement.innerHTML = "";
        break;
      case "Div Block":
        draggedElement.className = `div ${divOptions.color} ${divOptions.flow}`;
        draggedElement.innerHTML = "";
        break;
      default:
        break;
    }

    //prevent drop of similar elements inside eachother
    if (target.classList.contains(draggedElement.classList[0])) {
      setDraggedElement(undefined);
      return;
    }

    draggedElement.addEventListener("click", handleElementSelect as any);
    draggedElement.appendChild(deleteButton);
    target.appendChild(draggedElement);
    setDraggedElement(undefined);
  };

  const handleImageDrop: DargHandler = (e) => {
    if (!draggedElement || draggedElement?.innerText) return;
    e.preventDefault();
    const target = e.target as HTMLElement;

    const deleteButton = document.createElement("p");
    deleteButton.innerHTML = "⨯";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", handleDelete as any);

    const container = document.createElement("div");
    container.className = "image-container";
    container.addEventListener("drop", handlePreventDrop as any);

    draggedElement.addEventListener("drop", handlePreventDrop as any);
    draggedElement.className = "image";

    container.appendChild(deleteButton);
    container.appendChild(draggedElement);
    target.appendChild(container);
  };

  const handleDownloadCode = () => {
    const code = document.getElementById("source");
    const stylesheet = [...document.styleSheets[0].cssRules].slice(18);
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

  const handleSaveDesign = (e: any) => {
    e.preventDefault();
    const code = document.getElementById("source");
    const htmlCode = code!.outerHTML;
    const templatesArr = JSON.parse(localStorage.templates);
    templatesArr.push({ id: formData, html: htmlCode });
    console.log(templatesArr);
    localStorage.templates = JSON.stringify(templatesArr);
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-end gap-12 mb-4">
        <form onSubmit={handleSaveDesign} className="flex gap-2 items-center">
          <input
            required
            className="rounded-sm p-1 border border-gray-500"
            type="text"
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 rounded-md px-2 py-1">
            Save Design
          </button>
        </form>
        <button
          className="bg-blue-600 rounded-md px-2 py-1"
          onClick={handleDownloadCode}
        >
          Download Code
        </button>
      </div>
      <section className="flex gap-4 flex-shrink min-h-0">
        <AddSidebar setDraggedElement={setDraggedElement} />
        <div
          id="container"
          className="flex-grow max-w-full aspect-video overflow-y-auto flex"
        >
          <article
            id="source"
            className="main"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          ></article>
        </div>
        <ControlsSidebar
          buttonOptions={buttonOptions}
          setButtonOptions={setButtonOptions}
          controlsType={controlsType}
          sectionOptions={sectionOptions}
          setSectionOptions={setSectionOptions}
          containerOptions={containerOptions}
          setContainerOptions={setContainerOptions}
          divOptions={divOptions}
          setDivOptions={setDivOptions}
        />
      </section>
    </>
  );
};
