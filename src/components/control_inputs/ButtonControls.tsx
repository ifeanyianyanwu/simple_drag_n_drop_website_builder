import { BUTTON } from "../ControlsSidebar";

export const ButtonControls = ({ buttonOptions, setButtonOptions }: BUTTON) => {
  return (
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
  );
};
