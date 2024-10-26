import Image from 'next/image';

export default function Donate() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow">
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Support Gita Life NYC</h1>

          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                src="https://img1.wsimg.com/isteam/ip/3458a644-d186-438f-9ee3-59650cd81b43/gita.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25"
                alt="Bhagavad Gita"
                width={500}
                height={375}
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">Help Our Cause</h2>
              <p className="text-lg mb-6 text-gray-600">
                Your support and contributions will enable us to meet our goals and fund our mission.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2 text-gray-800">Donate via Zelle:</p>
                <p className="text-gray-700">Number: +1 8623658118 (Suraj)</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">Gita Life NYC</p>
          <p className="text-sm text-gray-400">Copyright © 2024 GitaLifeNYC - All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
