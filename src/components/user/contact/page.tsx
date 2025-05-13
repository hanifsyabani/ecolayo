'use client'

import { useState } from 'react';
import Head from 'next/head';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactView() {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    subject: ''
  });

 

 

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Hubungi Kami</title>
        <meta name="description" content="Halaman kontak kami" />
      </Head>

      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
          {/* Sidebar informasi kontak */}
          <div className="w-full md:w-1/3 bg-white p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-center">
                <MapPin className="h-8 w-8 text-green-500" />
              </div>
              
              <p className="text-center text-gray-700 mt-4">
                276 API Dr, San Jose, South
                <br />
                Dakota 83475
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-center">
                <Mail className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-center text-gray-700 mt-4">
                info@yourmail.com
                <br />
                help@yourmail.com
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-center">
                <Phone className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-center text-gray-700 mt-4">
                Telp (+84) 345-6789
                <br />
                (+84) 333-0987
              </p>
            </div>
          </div>

          {/* Form kontak */}
          <div className="w-full md:w-2/3 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Just Say Hello!</h2>
            <p className="text-gray-600 mb-6">
              Do you have anything you'd like to tell us or you want to get started with your
              project? Let us know how we can help! Feel free to contact me.
            </p>

            <form  className="mt-4">
              <div className="mb-4">
                <Label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  Your Email
                </ Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="subject" className="block text-sm font-medium text-gray-600">
                  Subject
                </Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="message" className="block text-sm font-medium text-gray-600">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  // onChange={handleChange}
                  // rows="4"
                  placeholder="Hello"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <Button
                type="submit"
                className="px-6 py-3 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Map section */}
        {/* <div className="mt-10 h-64 w-full rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596672786!2d-74.25987368715491!3d40.69767006766623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1652813390720!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            // allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div> */}
      </div>
    </div>
  );
}