import TemplateOne from "./../assets/Template.png";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-4 mb-8 flex flex-col gap-2 mx-4">
        <h1 className="text-2xl font-semibold">Select a Template</h1>
        <h4 className="text-md">
          Select a Template and Customize it to your taste
        </h4>
      </div>
      <div className="grid grid-cols-3 mx-4">
        <div
          className="cursor-pointer grid gap-2"
          onClick={() => navigate(`/portfolio_template`)}
        >
          <img src={TemplateOne} alt="Portfolio Template" />
          <p>Portfolio Starter</p>
        </div>
      </div>
    </>
  );
};
