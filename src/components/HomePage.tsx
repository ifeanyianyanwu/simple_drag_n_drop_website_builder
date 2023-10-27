import TemplateOne from "./../assets/Template.png";
import NewTemplate from "../assets/New.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LOCAL_TEMPLATE } from "./Template";

export const HomePage = () => {
  const navigate = useNavigate();
  const [recentDesigns, setRecentDesigns] = useState([]);

  useEffect(() => {
    const recents = JSON.parse(localStorage.templates);
    setRecentDesigns(recents);
  }, []);

  return (
    <>
      <div className="mt-4 mb-8 flex flex-col gap-2 mx-4">
        <h1 className="text-2xl font-semibold">Select a Template</h1>
        <h4 className="text-md">
          Select a Template and Customize it to your taste
        </h4>
      </div>
      <div className="grid grid-cols-5 mx-4">
        <div className="grid grid-cols-3 mx-4 col-span-4 gap-4">
          <div
            className="cursor-pointer grid gap-2"
            onClick={() => navigate(`/new`)}
          >
            <img
              src={NewTemplate}
              alt="New Template"
              className="aspect-video"
            />
            <p>New Design</p>
          </div>
          <div
            className="cursor-pointer grid gap-2"
            onClick={() => navigate(`/portfolio_template`)}
          >
            <img
              src={TemplateOne}
              alt="Portfolio Template"
              className="asp aspect-video"
            />
            <p>Portfolio Starter</p>
          </div>
        </div>
        <div>
          <h1 className="text-lg font-medium">Recent Works</h1>
          <ul className="flex flex-col gap-2 p-2 list-disc">
            {recentDesigns.map((item: LOCAL_TEMPLATE, index: number) => (
              <li
                key={index}
                onClick={() => navigate(`/${item.id}`)}
                className="cursor-pointer capitalize"
              >
                {item.id}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
