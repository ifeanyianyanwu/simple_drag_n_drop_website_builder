import React from "react";
import { HiCursorClick } from "react-icons/hi";

type Props = {
  controlsType: string | undefined;
  buttonOptions: string;
  setButtonOptions: any;
};

export const ControlsSidebar = ({
  controlsType,
  buttonOptions,
  setButtonOptions,
}: Props) => {
  return (
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
        <div className="grid place-items-center mt-8 gap-2 text-center">
          <HiCursorClick size={28} />
          Select a button to activate this panel
        </div>
      )}
    </aside>
  );
};
