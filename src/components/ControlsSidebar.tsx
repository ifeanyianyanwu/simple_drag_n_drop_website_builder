import React from "react";
import { HiCursorClick } from "react-icons/hi";
import { DIV_OPTIONS, SECTION_OPTIONS } from "./Template";
import { Container } from "./control_inputs/ContainerControls";
import { Section } from "./control_inputs/SectionControls";
import { ButtonControls } from "./control_inputs/ButtonControls";
import { Div } from "./control_inputs/DivControls";

type Props = {
  controlsType: string | undefined;
} & BUTTON &
  CONTAINER &
  SECTION &
  DIV;

export type BUTTON = {
  buttonOptions: string;
  setButtonOptions: React.Dispatch<React.SetStateAction<string>>;
};
export type CONTAINER = {
  containerOptions: string;
  setContainerOptions: React.Dispatch<React.SetStateAction<string>>;
};
export type SECTION = {
  sectionOptions: SECTION_OPTIONS;
  setSectionOptions: React.Dispatch<React.SetStateAction<SECTION_OPTIONS>>;
};
export type DIV = {
  divOptions: DIV_OPTIONS;
  setDivOptions: React.Dispatch<React.SetStateAction<DIV_OPTIONS>>;
};

export const ControlsSidebar = ({
  controlsType,
  buttonOptions,
  setButtonOptions,
  sectionOptions,
  setSectionOptions,
  containerOptions,
  setContainerOptions,
  divOptions,
  setDivOptions,
}: Props) => {
  return (
    <aside className="flex flex-col gap-6 w-[120px]">
      <h1 className="text-xl font-bold grid">Controls</h1>
      {controlsType === "button" ? (
        <ButtonControls
          buttonOptions={buttonOptions}
          setButtonOptions={setButtonOptions}
        />
      ) : controlsType === "section" ? (
        <Section
          sectionOptions={sectionOptions}
          setSectionOptions={setSectionOptions}
        />
      ) : controlsType === "container" ? (
        <Container
          containerOptions={containerOptions}
          setContainerOptions={setContainerOptions}
        />
      ) : controlsType === "div" ? (
        <Div divOptions={divOptions} setDivOptions={setDivOptions} />
      ) : (
        <div className="grid place-items-center mt-8 gap-2 text-center">
          <HiCursorClick size={28} />
          Select an element to activate this panel
        </div>
      )}
    </aside>
  );
};
