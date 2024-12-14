"use client";

import { useState } from "react";
import axios from "axios";

// Create an Axios instance for making API requests
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Ensure the API URL is defined in .env
  headers: {
    "Content-Type": "application/json",
  },
});

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes for the form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const response = await axiosInstance.post("/contact/api", formData);
      if (response.status === 201) {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setSuccessMessage("Your message has been sent successfully!");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setSuccessMessage(
        error?.response?.data?.error ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center py-10">
      <div className="w-full max-w-7xl p-10 rounded-3xl shadow-2xl bg-white bg-opacity-90">
        <h1 className="text-4xl font-medium text-center mb-5 text-gray-900 truncate">
          Get In Touch With Us
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Welcome to E Com Zone! Have questions or need assistance? Reach out to
          us via the form or contact information below. We are here to help you
          have the best shopping experience.
        </p>

        {/* Success Message */}
        {successMessage && (
          <p
            className={`mb-6 text-center text-lg font-medium ${
              successMessage.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {successMessage}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {/* Contact Information */}
          <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
              Contact Info
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <strong>Email:</strong> ecomzone@gmail.com
              </p>
              <p>
                <strong>Phone:</strong> +880 1981-397907
              </p>
              <p>
                <strong>Address:</strong> 123 Saver, Dhaka, Bangladesh
              </p>
              <p>
                <strong>Support Hours:</strong> Mon - Fri, 9 AM - 6 PM
              </p>
            </div>

            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-indigo-800 mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4 justify-center bg-indigo-100 p-4 rounded-xl">
                <a
                  href="https://www.facebook.com/engrarfin101/"
                  className="text-3xl text-indigo-600 hover:text-indigo-800 transition duration-300"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-3xl text-indigo-600 hover:text-indigo-800 transition duration-300"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-3xl text-indigo-600 hover:text-indigo-800 transition duration-300"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="absolute text-gray-500 left-4 -top-3 transform scale-75 origin-top-left transition-all duration-200"
                >
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg placeholder-transparent"
                  placeholder="Your Full Name"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className="absolute text-gray-500 left-4 -top-3 transform scale-75 origin-top-left transition-all duration-200"
                >
                  Your Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg placeholder-transparent"
                  placeholder="Your Email Address"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="phone"
                  className="absolute text-gray-500 left-4 -top-3 transform scale-75 origin-top-left transition-all duration-200"
                >
                  Your Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg placeholder-transparent"
                  placeholder="Your Phone Number"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="message"
                  className="absolute text-gray-500 left-4 -top-3 transform scale-75 origin-top-left transition-all duration-200"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg placeholder-transparent"
                  placeholder="Your Message"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-xl shadow-xl text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50`}
              >
                {isSubmitting ? "Submitting..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="my-10">
          <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
            Find Us
          </h3>
          <div className="w-full h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1234567890!2d-74.005974!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zNDDCsDMwJzMwLjQiTiA3NMKwMDgnMzcwLjQ1Jyo!5e0!3m2!1sen!2sus!4v1642529925732!5m2!1sen!2sus"
              className="w-full h-full border-0"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
