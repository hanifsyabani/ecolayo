import Image from "next/image";
import React from "react";
import Link from "next/link";
import Newsletter from "../newsletter";
import ClientTestimoni from "../home/client-testimoni";
import { ourTeam } from "@/lib/item";

export default function AboutView() {
  return (
    <>
      <section className="py-16 bg-gray-100 px-6 lg:px-2">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              100% Trusted Organic Food Store
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              We are committed to providing the freshest organic produce
              directly from local farmers to your table.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Our Story</h3>
              <p className="text-gray-600 mb-4">
                Freshbazar was founded in 2010 with a simple mission: to make
                organic, locally-grown food accessible to everyone. We believe
                that healthy food should be a right, not a privilege.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey began with a small farm stand and has grown into a
                trusted community resource for organic produce,
                sustainably-sourced goods, and education about healthy eating.
              </p>
              <div className="mt-6">
                <Link
                  href="/shop"
                  className="bg-green-600 text-white px-6 py-3 rounded-md font-medium"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="relative h-96">
              <div className="absolute inset-0 bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full relative">
                  <Image
                    src="/petani1.jpeg"
                    alt="Farmer with organic vegetables"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Values</h3>
            <p className="text-gray-600">
              At Freshbazar, we are guided by these core principles in
              everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Community First</h4>
              <p className="text-gray-600">
                We support local farmers and producers, creating a sustainable
                ecosystem for our community.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Health & Wellness</h4>
              <p className="text-gray-600">
                We believe that good food is the foundation of good health and a
                happy life.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Sustainability</h4>
              <p className="text-gray-600">
                We're committed to environmentally friendly practices that
                protect our planet for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Awesome Team</h3>
            <p className="text-gray-600">
              Meet the dedicated individuals who make Freshbazar possible.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ourTeam.map((member, index) => (
              <div className="text-center" key={index}>
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <Image
                    src={member.image}
                    alt="Team Member"
                    width={150}
                    height={150}
                  />
                </div>
                <h4 className="text-xl font-bold">{member.name}</h4>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center ">
          <h3 className="text-3xl font-bold mb-4">Client Testimonials</h3>
          <p className="text-gray-600">
            Hear what our happy customers have to say about their experience
            with Freshbazar.
          </p>
        </div>
        <ClientTestimoni />
      </section>

      <Newsletter isSosmed={false} />
    </>
  );
}
