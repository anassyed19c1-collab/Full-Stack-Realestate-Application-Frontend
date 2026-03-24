import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-50">

      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center text-center">
        <Image
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Real Estate"
          fill
          className="object-cover brightness-50"
        />

        <div className="relative z-10 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Dream Home (Temporary Design)
          </h1>
          <p className="mb-6 text-lg">
            Buy, Rent & Sell Properties Easily
          </p>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-3 max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Location"
              className="flex-1 p-3 border rounded-lg text-black"
            />
            <input
              type="text"
              placeholder="Property Type"
              className="flex-1 p-3 border rounded-lg text-black"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Featured Properties
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                className="h-52 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Luxury Villa</h3>
                <p className="text-gray-500">Karachi, Pakistan</p>
                <p className="text-blue-600 font-bold mt-2">PKR 2.5 Crore</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>

        <div className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2">Trusted Agents</h3>
            <p>Professional & verified property dealers</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p>Affordable and market competitive rates</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Secure Deals</h3>
            <p>Safe and transparent transactions</p>
          </div>
        </div>
      </section>

      {/* PROPERTY TYPES */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Browse By Category
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {["House", "Apartment", "Commercial", "Plots"].map((type) => (
            <div
              key={type}
              className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{type}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">
          Want to Sell Your Property?
        </h2>
        <p className="mb-6">List your property in minutes</p>
        <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
          Get Started
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-gray-300 py-10 text-center">
        <p>© 2026 RealEstate App. All rights reserved.</p>
      </footer>

    </div>
  );
}