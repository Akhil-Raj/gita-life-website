'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaYoutube,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
} from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (_) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Contact Us</h1>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <p className="text-xl mb-6 text-center text-gray-600">
            Seeking spiritual wisdom? Ready to explore the timeless teachings of the Bhagavad Gita?
          </p>

          <div className="flex justify-center items-center gap-8 mb-8">
            <Link
              href="https://chat.whatsapp.com/DHsfTIftW5hGBgpW2jaoRg"
              className="text-green-600 hover:text-green-700 transition duration-300"
            >
              <FaWhatsapp className="text-3xl" />
            </Link>
            <a
              href="tel:+19296310021"
              className="text-blue-600 hover:text-blue-700 transition duration-300"
            >
              <FaPhone className="text-3xl" />
            </a>
            <Link
              href="https://www.instagram.com/gitalifenyc/"
              className="text-pink-600 hover:text-pink-700 transition duration-300"
            >
              <FaInstagram className="text-3xl" />
            </Link>
            <Link
              href="https://www.youtube.com/@gitalifenyc"
              className="text-red-600 hover:text-red-700 transition duration-300"
            >
              <FaYoutube className="text-3xl" />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            {/* Left column: Map */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800 text-center">
                Gita Life NYC
              </h2>
              <p className="flex items-center justify-center text-gray-600 mb-4">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                305 Schermerhorn Street, Brooklyn, New York 11217, United States
              </p>
              <div className="w-full h-64 md:h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.5760389453245!2d-73.98469338459384!3d40.68760857933427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25bb2da930f05%3A0x19d916725467c69!2sISKCON%20New%20York%20City%20-%20Hare%20Krishna%20Center!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Right column: Contact form */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Get in Touch!
              </h2>
              <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 text-gray-700">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block mb-2 text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
                  ></textarea>
                </div>
                {/* <p className="text-sm text-gray-600 mb-4">
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> and{' '}
                  <a href="https://policies.google.com/terms" className="text-blue-600 hover:underline">Terms of Service</a> apply.
                </p> */}
                <div className="flex justify-center space-x-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
                {submitStatus === 'success' && (
                  <p className="mt-4 text-green-600 text-center">
                    Your message has been sent successfully!
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="mt-4 text-red-600 text-center">
                    There was an error sending your message. Please try again later.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">Gita Life NYC</p>
          <p className="text-sm text-gray-400">
            Copyright © 2024 GitaLifeNYC - All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
