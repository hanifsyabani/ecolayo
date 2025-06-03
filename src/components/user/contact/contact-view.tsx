"use client";

import { MapPin, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetStore } from "@/service/admin/store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostContactMessage } from "@/service/shop/contact";
import { useState } from "react";
import toast from "react-hot-toast";
import MapLocationStore from "./map-location-store";
import Newsletter from "../newsletter";
import { useSession } from "next-auth/react";
import ButtonSignin from "@/components/button-signin";

const schema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  subject: z.string().min(1),
  message: z.string().min(1),
});

type FormFields = z.infer<typeof schema>;
export default function ContactView() {
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const { data: session } = useSession();

  const { data: store, isLoading: isLoadingStore } = useQuery({
    queryFn: () => GetStore(),
    queryKey: ["dataStore"],
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { mutate: postmessage } = useMutation({
    mutationFn: (data: FormFields) => PostContactMessage(data),
    onSuccess: () => {
      setIsLoadingForm(false);
      reset();
      toast.success("Message sent successfully");
    },
    onError: () => {
      setIsLoadingForm(false);
      toast.error("Error sending message");
    },
  });

  function onSubmit(data: FormFields) {
    setIsLoadingForm(true);
    postmessage(data);
  }

  if (isLoadingStore) return <div className="spinner" />;
  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
          <div className="w-full md:w-1/3 bg-white p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-center">
                <MapPin className="h-8 w-8 text-green-500" />
              </div>

              <p className="text-center text-gray-700 mt-4">
                {store.address}
                <br />
                {store.city}
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-center">
                <Mail className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-center text-gray-700 mt-4">
                {store.email_store}
                <br />
                helpeco@gmail.com
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-center">
                <Phone className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-center text-gray-700 mt-4">
                Telp {store.phone}
              </p>
            </div>
          </div>

          <div className="w-full md:w-2/3 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Share Your Experience!
            </h2>
            <p className="text-gray-600 mb-6">
              We'd love to hear your thoughts about our store. Share your
              experience or feedback to help us serve you better!
            </p>

            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Your Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="example@gmail.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-600"
                >
                  Subject
                </Label>
                <Input
                  type="text"
                  id="subject"
                  {...register("subject")}
                  placeholder="Subject"
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-600"
                >
                  Your Testimoni
                </Label>
                <Textarea
                  rows={8}
                  id="message"
                  placeholder="Hello"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {session ? (
                <Button
                  type="submit"
                  className="px-6 py-3 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  disabled={isLoadingForm}
                >
                  {isLoadingForm ? (
                    <span className="spinner" />
                  ) : (
                    "Send Message"
                  )}
                </Button>
              ) : (
                <ButtonSignin />
              )}
            </form>
          </div>
        </div>

        <div className="mt-10">
          <div className="w-full h-96 rounded-lg overflow-hidden shadow">
            <MapLocationStore />
          </div>
        </div>

        <div className="mt-10">
          <Newsletter isSosmed={true} />
        </div>
      </div>
    </>
  );
}
