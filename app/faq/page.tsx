/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import HomePageBanner from "../customComponents/HomePageBanner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Service from "../customComponents/Service";

type FaqData = { question: string; answer: string }[];
const Faq = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const faqQuestion: FaqData = [
    {
      question: "Can I change or cancel my order after it's been placed?",
      answer:
        "Yes, you can change or cancel your order within the first hour of placing it. After that, your order may already be in processing and cannot be modified. Please contact our customer service team as soon as possible if you need to make changes.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy. Items must be returned in their original condition, with tags attached, and in the original packaging. Please visit our Returns & Refunds page for detailed instructions on how to initiate a return.",
    },
    {
      question: "How long will it take to receive my order?",
      answer:
        "Shipping times vary based on your location and the shipping method you select at checkout. Typically, standard shipping takes 5-7 business days, while expedited shipping options may deliver within 2-3 business days. You can view estimated delivery times on the product page or at checkout.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to many countries. Shipping fees and delivery times vary based on the destination. Additional customs fees may apply depending on your country’s import regulations.",
    },
    {
      question: "How do I apply a discount code to my order?",
      answer:
        "To apply a discount code, enter the code in the Promo Code field during checkout and click Apply. If the code is valid, the discount will be reflected in your total order amount. Only one promo code can be used per order.",
    },
    {
      question: "How do I track my order?",
      answer:
        "After placing an order, you will receive a confirmation email with a tracking number. You can use this number on our Order Tracking page to check the status of your shipment. If you have an account, you can also log in to view your order history and tracking information.",
    },
  ];

  const paymentFqa: FaqData = [
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, we use industry-standard encryption protocols to protect your payment information. Your card details are never stored on our servers, and all transactions are processed through secure payment gateways to ensure your data is safe.",
    },
    {
      question: "Why was my payment declined?",
      answer:
        "Payments may be declined for several reasons, such as incorrect card details, insufficient funds, or issues with your bank. Please double-check the information you've entered, contact your bank, or try using a different payment method. If the issue persists, feel free to reach out to our customer support team for assistance.",
    },
    {
      question:
        "Do you charge any additional fees for certain payment methods?",
      answer:
        "No, we do not charge any extra fees for using specific payment methods. However, depending on your bank or payment provider, there may be currency conversion fees or other charges. Please check with your provider for more details.",
    },
    {
      question: "Can I save my payment details for future purchases?",
      answer:
        "Yes, during checkout you can choose to save your payment details for faster future purchases. Your information is stored securely using encryption and can be managed or removed at any time by accessing your account settings.",
    },
  ];
  return (
    <main className="flex flex-col items-center">
      <section className="w-full">
        <HomePageBanner isHome={false} title="FAQ" from="Home" to="FAQ" />
      </section>
      <section className="w-full flex flex-col items-center gap-y-6 md:flex-row md:gap-x-6 md:justify-center md:items-start py-20 px-10">
        <section className="w-full md:w-1/4 flex flex-col gap-y-16">
          <article>
            <h2 className="text-lg font-semibold">Customer Service</h2>
            <p className="text-gray-400 py-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              exercitationem ad eveniet praesentium dignissimos illo, et
              repellendus nesciunt debitis consectetur at voluptates! Sunt,
              ullam sint voluptatem nulla nemo exercitationem nisi!
            </p>
            <div className="shadow-md p-5 flex flex-col gap-y-5">
              <h2 className="text-lg font-semibold">
                Contact us, with any help?
              </h2>
              <p className="text-gray-400 flex flex-col">
                <span>+880 176 1111 456</span>
                <span>info@support.com</span>
              </p>
            </div>
          </article>
          <article>
            <h2 className="text-2xl font-semibold">Ask any question?</h2>
            <p className="text-gray-400 py-3">
              Your email address will not be published.
            </p>
            <form noValidate className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2 w-full">
                <Label htmlFor="name" className="text-sm">
                  Your Name
                </Label>
                <Input
                  className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  {...register("name")}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="question" className="text-sm">
                  Your Question
                </Label>
                <Textarea
                  id="question"
                  className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
                  placeholder="Type your question"
                  {...register("review_description")}
                />
              </div>
              <Button className="bg-orange-500 hover:bg-orange-500 text-white w-1/2">
                Send Now
              </Button>
            </form>
          </article>
        </section>
        <section className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold pb-10">General FAQ's</h2>
          <article className="flex flex-col gap-y-5">
            {faqQuestion.map((faq: any, index: number) => (
              <Accordion
                key={index}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value="item-1" className="bg-gray-100 p-1 px-2">
                  <AccordionTrigger className="">
                    {faq?.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq?.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </article>
          <h2 className="text-3xl font-bold py-10">Payment FAQ's</h2>
          <article className="flex flex-col gap-y-5">
            {paymentFqa.map((faq: any, index: number) => (
              <Accordion
                key={index}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value="item-1" className="bg-gray-100 p-1 px-2">
                  <AccordionTrigger className="">
                    {faq?.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq?.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </article>
        </section>
      </section>
      <section className="w-3/4">
        <Service />
      </section>
    </main>
  );
};

export default Faq;
