import Image from "next/image";
import React from "react";
import cover1 from "../../UI/image/cover1.jpg";
import cover2 from "../../UI/image/cover2.jpg";
import cover3 from "../../UI/image/cover3.jpg";
import cover4 from "../../UI/image/cover4.jpg";
import cover5 from "../../UI/image/cover5.jpg";
import Link from "next/link";

const Header = () => {
  const slides = [
    {
      id: "slide1",
      image: cover1,
      title: "Welcome to Gardening Heaven",
      description: "Discover tips and tricks for a flourishing garden.",
      link: "#slide2",
    },
    {
      id: "slide2",
      image: cover2,
      title: "Cultivate Your Dream Garden",
      description: "Join us for expert advice on growing your plants.",
      link: "#slide3",
    },
    {
      id: "slide3",
      image: cover3,
      title: "Green Thumb Community",
      description: "Connect with like-minded gardeners today.",
      link: "#slide4",
    },
    {
      id: "slide4",
      image: cover4,
      title: "Organic Gardening 101",
      description: "Learn how to grow sustainable, organic produce.",
      link: "#slide5",
    },
    {
      id: "slide5",
      image: cover5,
      title: "Gardening for Beginners",
      description: "Start your gardening journey with us!",
      link: "#slide1",
    },
  ];

  return (
    <div className="carousel w-full h-screen relative">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          id={slide.id}
          className="carousel-item relative w-full h-full"
        >
          <Image
            src={slide.image}
            alt={`${slide.title} Image`}
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-5 bg-black bg-opacity-40">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {slide.title}
            </h1>
            <p className="text-lg md:text-2xl text-white mb-6">
              {slide.description}
            </p>
            <Link
              href="signup"
              className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
            >
              Join Now
            </Link>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-20">
            <a
              href={`#${
                slides[index === 0 ? slides.length - 1 : index - 1].id
              }`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a href={slide.link} className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Header;
