"use client";

import { useEffect, useState } from "react";

const SellPercantageCard = () => {
  const [experience, setExperience] = useState(0);
  const [projects, setProjects] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [awards, setAwards] = useState(0);

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const increment = 50;
      const totalFrames = duration / increment;

      const easeOut = (t: number) => t * (2 - t);

      let frame = 0;

      const interval = setInterval(() => {
        frame++;
        const progress = easeOut(frame / totalFrames);

        setExperience(Math.min(Math.floor(progress * 240), 240));
        setProjects(Math.min(Math.floor(progress * 400), 400));
        setCustomers(Math.min(Math.floor(progress * 900), 900));
        setAwards(Math.min(Math.floor(progress * 457), 457)); // For awards, it remains 0

        if (frame === totalFrames) clearInterval(interval);
      }, increment);
    };

    animateCounters();
  }, []);

  return (
    <div className=" text-white mx-auto mb-5">
      <h2 className="text-4xl font-medium text-center mb-5 text-gray-900 truncate">
        Sell Generate
      </h2>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Personal Info */}
          <div>
            <ul className="space-y-6 text-lg">
              <div className="flex flex-wrap gap-6">
                <div>
                  <div>
                    <h1 className="text-3xl font-medium text-center mb-5 text-gray-900 truncate">
                      Explore millions of offerings tailored <br /> to your
                      business needs
                    </h1>
                  </div>
                </div>
                <div></div>
              </div>
            </ul>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-sky-600 hover:scale-105 transition-transform p-8 rounded-lg text-center shadow-md">
                <p className="text-3xl  font-medium mb-3">products</p>
                <h3 className="text-5xl font-extrabold text-yellow-400">
                  {experience}K+
                </h3>
              </div>

              <div className="bg-sky-600 hover:scale-105 transition-transform p-8 rounded-lg text-center shadow-md">
                <p className="text-3xl font-medium mt-3">suppliers</p>
                <h3 className="text-5xl font-extrabold text-yellow-400">
                  {projects}+
                </h3>
              </div>

              <div className="bg-sky-600 hover:scale-105 transition-transform p-8 rounded-lg text-center shadow-md">
                <p className="text-3xl font-medium mb-3">product categories</p>
                <h3 className="text-5xl font-extrabold text-yellow-400">
                  {customers}
                </h3>
              </div>

              <div className="bg-sky-600 hover:scale-105 transition-transform p-8 rounded-lg text-center shadow-md">
                <p className="text-3xl font-medium mb-3">
                  countries and regions
                </p>
                <h3 className="text-5xl font-extrabold text-yellow-400">
                  {awards}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPercantageCard;
