import { SECTION } from "../ControlsSidebar";

export const Section = ({ sectionOptions, setSectionOptions }: SECTION) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-1">Color</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="radio"
            name="section_color"
            id="bg-transparent"
            checked={sectionOptions.color === "bg-transparent"}
            onChange={(e) =>
              setSectionOptions((prev) => ({
                color: "bg-transparent",
                layout: prev.layout,
              }))
            }
          />
          <label htmlFor="bg-transparent">Transparent</label>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="radio"
            name="section_color"
            id="bg-yellow"
            checked={sectionOptions.color === "bg-yellow"}
            onChange={(e) =>
              setSectionOptions((prev) => ({
                color: "bg-yellow",
                layout: prev.layout,
              }))
            }
          />
          <label htmlFor="bg-yellow">Yellow</label>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="radio"
            name="section_color"
            id="bg-blue"
            checked={sectionOptions.color === "bg-blue"}
            onChange={(e) =>
              setSectionOptions((prev) => ({
                color: "bg-blue",
                layout: prev.layout,
              }))
            }
          />
          <label htmlFor="bg-blue">Blue</label>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="radio"
            name="section_color"
            id="bg-green"
            checked={sectionOptions.color === "bg-green"}
            onChange={(e) =>
              setSectionOptions((prev) => ({
                color: "bg-green",
                layout: prev.layout,
              }))
            }
          />
          <label htmlFor="bg-green">Green</label>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">Layout</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="radio"
            name="section_layout"
            id="single-column"
            checked={sectionOptions.layout === "single-column"}
            onChange={(e) =>
              setSectionOptions((prev) => ({
                color: prev.color,
                layout: "single-column",
              }))
            }
          />
          <label htmlFor="single-column">Single Column</label>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="radio"
            name="section_layout"
            id="double-column"
            checked={sectionOptions.layout === "double-column"}
            onChange={(e) =>
              setSectionOptions((prev) => ({
                color: prev.color,
                layout: "double-column",
              }))
            }
          />
          <label htmlFor="single-column">Double Column</label>
        </div>
      </div>
    </>
  );
};
