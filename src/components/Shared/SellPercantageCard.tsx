"use client";

import { useEffect, useState } from "react";

const SellPercentageCard = () => {
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
        setAwards(Math.min(Math.floor(progress * 457), 457));

        if (frame === totalFrames) clearInterval(interval);
      }, increment);
    };

    animateCounters();
  }, []);

  return (
    <div className="py-16 px-6 bg-slate-50/50">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-slate-800 tracking-tight">
        Platform Statistics
      </h2>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Section */}
          <div className="lg:col-span-5 flex flex-col justify-center items-start">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight">
              Explore millions of offerings tailored to your business needs
            </h3>
            <p className="mt-4 text-slate-500 leading-relaxed text-sm sm:text-base">
              Connecting buyers and sellers worldwide with secure transactions, verified suppliers, and dynamic inventory matching.
            </p>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Products
              </p>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-sky-600">
                {experience}K+
              </h3>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Suppliers
              </p>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-sky-600">
                {projects}+
              </h3>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Product Categories
              </p>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-sky-600">
                {customers}
              </h3>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Countries & Regions
              </p>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-sky-600">
                {awards}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPercentageCard;
