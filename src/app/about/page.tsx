import Image from "next/image";
import about1 from "../../UI/icon/profile.jpg";

const aboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <Image
            src={about1}
            height="100"
            width="100"
            alt="About Us"
            className="rounded-full h-100 w-100 shadow-lg object-cover w-full max-w-lg h-auto"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to our e-commerce platform, where quality and customer
            satisfaction come first. Our journey began with a vision to provide
            exceptional products and a seamless shopping experience to everyone,
            everywhere. Today, we are proud to be a trusted name in the
            e-commerce industry, offering a wide range of items tailored to meet
            your needs.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to bring you the latest and most reliable products
            with a focus on affordability, convenience, and customer service.
            From top-quality electronics to stylish apparel, we are committed to
            ensuring you find exactly what you are looking for.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
        <div className="grid lg:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-gray-600">
              We never compromise on quality. Every product is carefully
              selected and rigorously tested to meet your expectations.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority. We listen, we adapt, and we
              strive to make every interaction positive and memorable.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We stay ahead of the curve, bringing you the latest trends and
              cutting-edge products to enhance your shopping experience.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid lg:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Image
              src={about1}
              height="150"
              width="200"
              alt="Team Member 1"
              className="rounded-full w-32 h-32 object-cover shadow-lg mb-4"
            />
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={about1}
              height="150"
              width="200"
              alt="Team Member 2"
              className="rounded-full w-32 h-32 object-cover shadow-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-gray-600">Head of Marketing</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={about1}
              height="150"
              width="200"
              alt="Team Member 3"
              className="rounded-full w-32 h-32 object-cover shadow-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Mike Johnson</h3>
            <p className="text-gray-600">Lead Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutPage;
