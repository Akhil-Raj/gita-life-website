"use client";

import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';

export default function Events() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Events</h1>

        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                date: "Saturday November 16th, 2024",
                name: "Monthly Youth Festival (With Rasnath Das)",
                description: "[STAY TUNED FOR MORE INFO]",
                time: "5:30pm-8:30pm",
                location: "ISKCON NYC - 305 Schermerhorn Street, Brooklyn, NY 11217",
                whatsappLink: "https://chat.whatsapp.com/DHsfTIftW5hGBgpW2jaoRg",
                registrationLink: true,
              },
              {
                date: "Saturday October 12th, 2024",
                name: "Jersey City Weekly Program",
                description: "Topic covered : Increasing auspiciousness in our lives",
                time: "12:30-2:30pm",
                location: "3287, JFK Boulevard, Jersey City, NJ",
                whatsappLink: "https://chat.whatsapp.com/DbvimUwcnBG4IcPxod9r02",
              },
              {
                date: "Saturday October 12th, 2024",
                name: "Harrison Weekly Program",
                description: "Topic covered : Arjuna's Weakness of Heart",
                time: "3pm-5pm",
                location: "600 FE, Rodgers Boulevard North. Harrison",
                whatsappLink: "https://chat.whatsapp.com/HZnWTh54J897KyQdlGpPv6",
              },
              {
                date: "Saturday October 12th, 2024",
                name: "NYU Weekly Program",
                description: "Topic covered : Arjuna's Weakness of Heart",
                time: "7pm-9pm",
                location: "600 FE, Rodgers Boulevard North. Harrison",
                contact: "+1 516 979 6593 (Akhil)",
              },
              {
                date: "Sunday October 13th, 2024",
                name: "Gita Class",
                description: "Verse(s) covered : Chapter 4, verses 35-38",
                time: "6:50pm-8:30pm",
                location: "ISKCON NYC - 305 Schermerhorn Street, Brooklyn, NY 11217",
                whatsappLink: "https://chat.whatsapp.com/DHsfTIftW5hGBgpW2jaoRg",
              },
            ].map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="bg-saffron text-white p-4">
                  <h3 className="text-xl font-semibold">{event.name}</h3>
                </div>
                <div className="p-6">
                  <p className="flex items-center text-gray-600 mb-2">
                    <FaCalendarAlt className="mr-2 text-saffron" />
                    {event.date}
                  </p>
                  <p className="flex items-center text-gray-600 mb-2">
                    <FaClock className="mr-2 text-saffron" />
                    {event.time}
                  </p>
                  <p className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="mr-2 text-saffron" />
                    {event.location}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <FaInfoCircle className="inline-block mr-2 text-saffron" />
                    {event.description}
                  </p>
                  {event.whatsappLink && (
                    <a href={event.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline block mb-4">
                      Join WhatsApp Group
                    </a>
                  )}
                  {event.contact && (
                    <p className="text-gray-700 mb-4">
                        <strong>Contact:{' '}
                        <a href={`tel:${event.contact.replace(/\D/g, '')}`} className="text-blue-600 hover:underline">
                        {event.contact}
                        </a>
                        </strong>
                    </p>
                  )}
                  {event.registrationLink && (
                    <button
                      onClick={() => setShowRegistrationForm(true)}
                      className="bg-saffron text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                      Register for Event
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Weekly Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                day: "Every Saturday",
                name: "GITA IN A NUTSHELL",
                description: "Live in-physical courses for youths based on Bhagavad Gita (Registration Compulsory for attendance)",
                time: "All day",
                location: "Iskcon NYC, New Jersey, Harrison City",
                whatsappLinks: [
                  { name: "Harrison", link: "https://chat.whatsapp.com/HZnWTh54J897KyQdlGpPv6" },
                  { name: "Jersey City", link: "https://chat.whatsapp.com/DbvimUwcnBG4IcPxod9r02" },
                ],
              },
              {
                day: "Date : On session by session basis",
                name: "GITA IN A NUTSHELL - BACKUP",
                description: "TOPIC : On session by session basis",
                time: "Timing : On session by session basis",
                location: "Online via Zoom",
                contact: "+1 516 979 6593 (Akhil)",
              },
              {
                day: "Every Sunday",
                name: "Gita Class",
                description: "Scientific understanding of Bhagavad Gita via verse by verse discourses",
                time: "6:50pm-8:30pm",
                location: "ISKCON NYC - 305 Schermerhorn Street, Brooklyn, NY 11217",
                whatsappLink: "https://chat.whatsapp.com/DHsfTIftW5hGBgpW2jaoRg"
              },
            ].map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="bg-saffron text-white p-4">
                  <h3 className="text-xl font-semibold">{event.name}</h3>
                </div>
                <div className="p-6">
                  <p className="flex items-center text-gray-600 mb-2">
                    <FaCalendarAlt className="mr-2 text-saffron" />
                    {event.day}
                  </p>
                  <p className="flex items-center text-gray-600 mb-2">
                    <FaClock className="mr-2 text-saffron" />
                    {event.time}
                  </p>
                  <p className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="mr-2 text-saffron" />
                    {event.location}
                  </p>
                  <p className="text-gray-700">
                    <FaInfoCircle className="inline-block mr-2 text-saffron" />
                    {event.description}
                  </p>
                  {event.whatsappLinks && (
                    <div className="mt-4">
                      <p className="text-lg font-semibold mb-2 text-gray-800">Join WhatsApp Groups:</p>
                      {event.whatsappLinks.map((link, i) => (
                        <a key={i} href={link.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                          {link.name} Group
                        </a>
                      ))}
                    </div>
                  )}
                  {event.whatsappLink && (
                    <a href={event.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline mt-4 block">
                      Join WhatsApp Group
                    </a>
                  )}
                  {event.contact && (
                    <p className="text-gray-700 mt-2">
                    <strong>Contact:{' '}
                    <a href={`tel:${event.contact.replace(/\D/g, '')}`} className="text-blue-600 hover:underline">
                    {event.contact}
                    </a>
                    </strong>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Monthly Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Monthly Events</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="bg-saffron text-white p-4">
              <h3 className="text-xl font-semibold">Monthly Youth Festival</h3>
            </div>
            <div className="p-6">
              <p className="flex items-center text-gray-600 mb-2">
                <FaCalendarAlt className="mr-2 text-saffron" />
                Once a Month on Saturday
              </p>
              <p className="flex items-center text-gray-600 mb-2">
                <FaClock className="mr-2 text-saffron" />
                5:30 PM
              </p>
              <p className="flex items-center text-gray-600 mb-4">
                <FaMapMarkerAlt className="mr-2 text-saffron" />
                Iskcon NYC, New Jersey, Harrison City
              </p>
              <p className="text-gray-700 mb-4">
                <FaInfoCircle className="inline-block mr-2 text-saffron" />
                Gita Life NYC's flagship event featuring:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
                <li>Darshan Aarti🪔</li>
                <li>Spiritual Talk🎤</li>
                <li>Dancing Kirtan🪘</li>
                <li>Prasadam Feast🥗</li>
                <li>And many more...!</li>
              </ul>
              <a href="https://chat.whatsapp.com/DHsfTIftW5hGBgpW2jaoRg" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline mt-4 block">
                Join WhatsApp Group
              </a>
            </div>
          </div>
        </section>
      </div>

      {showRegistrationForm && (
        <RegistrationForm onClose={() => setShowRegistrationForm(false)} />
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">Gita Life NYC</p>
          <p className="text-sm text-gray-400">Copyright © 2024 GitaLifeNYC - All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
