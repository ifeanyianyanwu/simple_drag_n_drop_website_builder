import { DIV } from "../ControlsSidebar";

export const Div = ({ divOptions, setDivOptions }: DIV) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-1">Color</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="radio"
            name="div_color"
            id="bg-transparent"
            checked={divOptions.color === "bg-transparent"}
            onChange={(e) =>
              setDivOptions((prev) => ({
                color: "bg-transparent",
                flow: prev.flow,
              }))
            }
          />
          <label htmlFor="bg-transparent">Transparent</label>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="radio"
            name="div_color"
            id="bg-yellow"
            checked={divOptions.color === "bg-yellow"}
            onChange={(e) =>
              setDivOptions((prev) => ({
                color: "bg-yellow",
                flow: prev.flow,
              }))
            }
          />
          <label htmlFor="bg-yellow">yellow</label>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="radio"
            name="div_color"
            id="bg-blue"
            checked={divOptions.color === "bg-blue"}
            onChange={(e) =>
              setDivOptions((prev) => ({
                color: "bg-blue",
                flow: prev.flow,
              }))
            }
          />
          <label htmlFor="bg-blue">Blue</label>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="radio"
            name="div_color"
            id="bg-green"
            checked={divOptions.color === "bg-green"}
            onChange={(e) =>
              setDivOptions((prev) => ({
                color: "bg-green",
                flow: prev.flow,
              }))
            }
          />
          <label htmlFor="bg-green">Green</label>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">flow</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="radio"
            name="div_flow"
            id="horizontal"
            checked={divOptions.flow === "horizontal"}
            onChange={(e) =>
              setDivOptions((prev) => ({
                color: prev.color,
                flow: "horizontal",
              }))
            }
          />
          <label htmlFor="horizontal">Horizontal</label>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="radio"
            name="div_flow"
            id="vertical"
            checked={divOptions.flow === "vertical"}
            onChange={(e) =>
              setDivOptions((prev) => ({
                color: prev.color,
                flow: "vertical",
              }))
            }
          />
          <label htmlFor="vertical">Vertical</label>
        </div>
      </div>
    </>
  );
};
