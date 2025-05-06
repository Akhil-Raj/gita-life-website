'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imagesPerPage = 8;

  const galleryImages = [
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20221106_192532308.MP-c511ad6.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20221112_201646330.MP.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20221106_192524260-7905c15.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20230408_214838660-035b257.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20230408_211713848.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20230204_201309760.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20230408_212127316.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20230408_222939175-a43b301.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20230408_210005569.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20230204_203509564.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20230408_211952386.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20230402_162923663.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20230129_224031782.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20230129_224000922.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20221106_191127352.MP.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20221106_192524260.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20221106_191024806.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20220820_033312546.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20220820_033309615.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20221022_004854519.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/IMG-20230330-WA0002.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/IMG-20220929-WA0001.jpg',
    'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/IMG-20221126-WA0002.jpg',
  ];

  const totalPages = Math.ceil(galleryImages.length / imagesPerPage);
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = galleryImages.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const openModal = (src: string) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* About Us */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/krishna-arjun-kurukshetra-war-o92nc507nc3hahd.webp/:/cr=t:0%25,l:0%25,w:100%25,h:100%25"
              alt="Krishna and Arjuna at Kurukshetra"
              width={500}
              height={375}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">About Us</h2>
            <p className="text-lg mb-4 text-gray-600">
              Gita Life NYC comprises a group of driven students and young professionals who are
              dedicated to propagating the timeless wisdom of Vedic literature, including the
              Bhagavad Gita.
            </p>
            <p className="text-lg text-gray-600">
              They aim to aid young individuals in accomplishing personal, professional, social,
              emotional, and spiritual advancement.
            </p>
          </div>
        </div>
      </section>

      {/* Our Offerings */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Activities',
                description:
                  'Join our weekly gatherings for spiritual discussions and community bonding.',
                image:
                  'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20220704_174651386.MP.jpg/:/cr=t:0.48%25,l:0%25,w:100%25,h:88.89%25/rs=w:600,h:300,cg:true',
              },
              {
                title: 'Courses',
                description: 'Explore our in-depth courses on Bhagavad Gita and Vedic philosophy.',
                image:
                  'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/buddhist-monk-sits-in-yoga-lotus-position-medi.jpg/:/cr=t:2.94%25,l:0%25,w:100%25,h:94.12%25/rs=w:600,h:300,cg:true',
              },
              {
                title: 'Mantra Meditation',
                description:
                  'Learn and practice ancient mantra meditation techniques for inner peace.',
                image:
                  'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/169545636_3860992770681217_5229668540860906963.jpg/:/cr=t:5.56%25,l:0%25,w:100%25,h:88.89%25/rs=w:600,h:300,cg:true',
              },
              {
                title: 'Applied Spirituality for Practical Utility',
                description:
                  'Discover how to apply spiritual principles in your daily life for practical benefits.',
                image:
                  'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/PXL_20221106_191127352.MP.jpg/:/rs=w:600,h:300,cg:true,m/cr=w:600,h:300',
              },
            ].map((offering, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative w-full pt-[56.25%]">
                  <Image
                    src={offering.image}
                    alt={offering.title}
                    fill
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{offering.title}</h3>
                  <p className="text-gray-600">{offering.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentImages.map((src, index) => (
              <div key={index} className="cursor-pointer" onClick={() => openModal(src)}>
                <Image
                  src={src}
                  alt={`Gallery image ${indexOfFirstImage + index + 1}`}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="max-w-4xl max-h-full p-4">
            <Image
              src={selectedImage}
              alt="Enlarged gallery image"
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: 'Course sparked newfound creativity in game design.',
                author: 'Akshay',
                image:
                  'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/Testimonials_01.5-f9d0af7.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true',
              },
              {
                quote: 'Balanced work, life, and inner peace thanks to this course.',
                author: 'Somnath',
                image:
                  'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/Testimonials_02.5.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true',
              },
              {
                quote: 'NYU journey enlightened by deep wisdom and insight.',
                author: 'Rajesh',
                image:
                  'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/Testimonials_03.5.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true',
              },
              {
                quote: 'Starting my spiritual journey with newfound understanding.',
                author: 'Manoj',
                image:
                  'https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/Testimonials_04.5.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.author}'s photo`}
                  className="w-24 h-24 rounded-full mr-6 object-cover"
                />
                <div>
                  <p className="italic mb-4 text-gray-600">"{testimonial.quote}"</p>
                  <p className="font-semibold text-gray-800">- {testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://img1.wsimg.com/isteam/stock/19003")' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <blockquote className="text-white text-2xl italic text-center max-w-3xl mx-auto">
            &ldquo;You have the right to work, but never to the fruit of the work. You should never
            engage in action for the sake of Reward, nor should you long for Inaction.&rdquo;
          </blockquote>
          <p className="text-right mt-4 font-semibold text-white">- Krishna, BG 2.47</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
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
