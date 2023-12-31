import { useState } from "react";
import { Canvas } from "./Canvas";
import { AddSidebar } from "./AddSidebar";
import { ControlsSidebar } from "./ControlsSidebar";
import { createAndDownloadFile } from "../utils/createAndDownLoadFile";

export const PortfolioTemplate = () => {
  const [draggedElement, setDraggedElement] = useState<HTMLElement>();
  const [buttonOptions, setButtonOptions] = useState<string>("blue-button");
  const [controlsType, setControlsType] = useState<string>();

  const handleDownloadCode = () => {
    const code = document.getElementById("source");
    const stylesheet = [...document.styleSheets[0].cssRules].slice(15);
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

    console.log(cssCode);

    createAndDownloadFile(htmlCode, "index.html");
    createAndDownloadFile(cssCode, "styles.css");
  };

  return (
    <>
      <div className="flex mb-3">
        <button
          className="bg-blue-600 rounded-md px-2 py-1 ml-auto"
          onClick={handleDownloadCode}
        >
          Download Code
        </button>
      </div>
      <section className="flex gap-4 flex-shrink min-h-0">
        <AddSidebar setDraggedElement={setDraggedElement} />
        <main className="flex-grow max-w-full">
          <Canvas
            buttonOptions={buttonOptions}
            draggedElement={draggedElement}
            setControlsType={setControlsType}
            setButtonOptions={setButtonOptions}
          />
        </main>
        <ControlsSidebar
          buttonOptions={buttonOptions}
          setButtonOptions={setButtonOptions}
          controlsType={controlsType}
          sectionOptions={{ color: "", layout: "" }}
          setSectionOptions={() => {}}
          containerOptions=""
          setContainerOptions={() => {}}
          divOptions={{ color: "", flow: "" }}
          setDivOptions={() => {}}
        />
      </section>
    </>
  );
};
