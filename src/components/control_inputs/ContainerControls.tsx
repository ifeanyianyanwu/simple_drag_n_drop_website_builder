import { CONTAINER } from "../ControlsSidebar";

export const Container = ({
  containerOptions,
  setContainerOptions,
}: CONTAINER) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-1">Color</h3>
      <div className="flex gap-2 mb-2">
        <input
          type="radio"
          name="section_color"
          id="bg-transparent"
          checked={containerOptions === "bg-transparent"}
          onChange={(e) => setContainerOptions("bg-transparent")}
        />
        <label htmlFor="bg-transparent">Transparent</label>
      </div>
      <div className="flex gap-2 mb-2">
        <input
          type="radio"
          name="section_color"
          id="bg-yellow"
          checked={containerOptions === "bg-yellow"}
          onChange={(e) => setContainerOptions("bg-yellow")}
        />
        <label htmlFor="bg-yellow">yellow</label>
      </div>
      <div className="flex gap-2 mb-2">
        <input
          type="radio"
          name="section_color"
          id="bg-blue"
          checked={containerOptions === "bg-blue"}
          onChange={(e) => setContainerOptions("bg-blue")}
        />
        <label htmlFor="bg-blue">Blue</label>
      </div>
      <div className="flex gap-2 mb-2">
        <input
          type="radio"
          name="section_color"
          id="bg-green"
          checked={containerOptions === "bg-green"}
          onChange={(e) => setContainerOptions("bg-green")}
        />
        <label htmlFor="bg-green">Green</label>
      </div>
    </div>
  );
};
