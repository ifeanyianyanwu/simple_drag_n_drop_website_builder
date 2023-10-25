import React, {
  DragEventHandler,
  MouseEventHandler,
  useState,
  useEffect,
} from "react";
import Potrait from "../assets/potrait.jpg";

type Props = {
  draggedElement: HTMLElement | undefined;
  buttonOptions: string;
  setControlsType: React.Dispatch<React.SetStateAction<string | undefined>>;
  setButtonOptions: React.Dispatch<React.SetStateAction<string>>;
};

type DargHandler = DragEventHandler<HTMLElement>;
type ClickHandler = MouseEventHandler<HTMLElement>;

export const Canvas = ({
  draggedElement,
  buttonOptions,
  setControlsType,
  setButtonOptions,
}: Props) => {
  const [selectedElement, setSelectedElement] = useState<HTMLElement>();

  const handleDragOver: DargHandler = (e) => {
    e.preventDefault();
  };

  const handleDelete: ClickHandler = (e) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    let element = target.parentNode!;
    target.parentNode!.parentNode!.removeChild(element);
  };

  const handleImageDelete: ClickHandler = (e) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    let element = target.previousElementSibling!;
    target.parentNode!.removeChild(element);
    target.parentNode!.removeChild(target);
  };

  const handlePreventDrop: DargHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleElementSelect: ClickHandler = (e) => {
    const target = e.target as HTMLElement;
    const classList = target.classList;
    setSelectedElement(target);
    switch (classList[0]) {
      case "button":
        setControlsType(classList[0]);
        if (classList.length > 1) {
          setButtonOptions(classList[1]);
        }
        break;
      default:
        setControlsType(undefined);
        setButtonOptions("blue-button");
        break;
    }
  };

  const handleDrop: DragEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (!draggedElement?.innerText) return;

    const target = e.target as HTMLElement;
    const elementType = draggedElement.innerText;

    const deleteButton = document.createElement("p");
    deleteButton.innerHTML = "⨯";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", handleDelete as any);
    draggedElement.appendChild(deleteButton);

    draggedElement.setAttribute("contentEditable", "true");
    draggedElement.addEventListener("drop", handlePreventDrop as any);

    switch (elementType) {
      case "Heading":
        draggedElement.className = "heading";
        draggedElement.setAttribute("contentEditable", "true");
        break;
      case "Sub-Heading":
        draggedElement.className = "sub_heading";
        draggedElement.setAttribute("contentEditable", "true");
        break;
      case "Text":
        draggedElement.className = "text";
        draggedElement.setAttribute("contentEditable", "true");
        break;
      case "Button":
        draggedElement.className = "button";
        draggedElement.classList.add(buttonOptions);
        break;
      default:
        break;
    }

    draggedElement.addEventListener("click", handleElementSelect as any);
    target.appendChild(draggedElement);
  };

  const handleImageDrop: DargHandler = (e) => {
    if (!draggedElement || draggedElement?.innerText) return;
    e.preventDefault();
    const target = e.target as HTMLElement;

    const deleteButton = document.createElement("p");
    deleteButton.innerHTML = "⨯";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", handleImageDelete as any);

    draggedElement.addEventListener("drop", handlePreventDrop as any);
    draggedElement.className = "image";
    target.appendChild(draggedElement);
    target.appendChild(deleteButton);
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

  return (
    <article id="source" className="main">
      <nav className="nav">
        <h3 className="nav_heading" contentEditable>
          My Website
        </h3>
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
            <h4
              className="sub_heading"
              onClick={handleElementSelect}
              onDrop={handlePreventDrop}
              contentEditable
            >
              <span className="delete" onClick={handleDelete}>
                ⨯
              </span>
              Welcome
            </h4>
            <h1
              className="heading"
              onClick={handleElementSelect}
              onDrop={handlePreventDrop}
              contentEditable
            >
              <span className="delete" onClick={handleDelete}>
                ⨯
              </span>
              I'm Ifeanyi Anyanwu
            </h1>
            <p
              className="text"
              onClick={handleElementSelect}
              onDrop={handlePreventDrop}
              contentEditable
            >
              <span className="delete" onClick={handleDelete}>
                ⨯
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              minima delectus explicabo repudiandae, sequi consequatur quia
              unde, excepturi fugit quibusdam praesentium fuga sed aliquid
              voluptatum! Veniam dolores doloribus quas modi.
            </p>
            <button
              className="button blue-button"
              onClick={handleElementSelect}
              onDrop={handlePreventDrop}
              contentEditable
            >
              <span className="delete" onClick={handleDelete}>
                ⨯
              </span>
              See more
            </button>
            <button
              className="button light-button"
              onClick={handleElementSelect}
              onDrop={handlePreventDrop}
              contentEditable
            >
              <p className="delete" onClick={handleDelete}>
                ⨯
              </p>
              Download
            </button>
          </div>
        </div>
        <div className="secondary_section">
          <div
            className="image_area dashed_border"
            onDrop={handleImageDrop}
            onDragOver={handleDragOver}
          >
            <img
              src={Potrait}
              alt="Potrait"
              onDrop={handlePreventDrop}
              className="image"
            />
            <span className="delete" onClick={handleImageDelete}>
              ⨯
            </span>
          </div>
        </div>
      </section>
    </article>
  );
};
