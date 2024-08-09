'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FiPhoneCall } from 'react-icons/fi';
import { TfiEmail, TfiLocationPin } from 'react-icons/tfi';
import {
  FaFacebook,
  FaPinterest,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import Link from 'next/link';

const Footer = () => {
  return (
    <main className='grid grid-cols-3 gap-x-20 bg-black w-full py-20 px-20 justify-between'>
      <div className='text-gray-400 flex flex-col gap-y-4 items-end'>
        <p className='text-xl font-medium text-white flex flex-col'>
          <p>About Medsta</p>
          <p className='w-6 h-[2px] bg-white'></p>
        </p>
        <p className='w-[250px]'>
          Medsta store - World wide store since 2020. We sell over 200+ category
          products on our website.
        </p>
        <div className='flex gap-x-4'>
          <div className='bg-white h-[80%] w-1 mt-1 ml-4 flex flex-col justify-between'>
            <p className='bg-white rounded-full h-3 w-4'></p>
            <p className='bg-white rounded-full h-3 w-4'></p>
            <p className='bg-white rounded-full h-3 w-4'></p>
          </div>
          <div>
            <div className='flex items-center gap-x-2'>
              <FiPhoneCall />
              <div>
                <p>+880 176 1111 456</p>
                <p>+880 172 1245 436</p>
              </div>
            </div>
            <div className='flex items-center gap-x-2'>
              <TfiEmail />
              <div>
                <p>info@medsta.com</p>
                <p>info@support.com</p>
              </div>
            </div>
            <div className='flex items-center gap-x-2'>
              <TfiLocationPin />
              <div>
                <p>186/170, Avenue 01, Mirpur</p>
                <p>Ankara, Turkey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='border-2 border-black text-gray-400 flex flex-col items-center justify-between'>
        <div>Logo</div>
        <div>
          <p>Register Now To Get Update On Promotion And Coupons.</p>
          <p className='text-center'>Don't Worry! it's Not Spam</p>
        </div>

        <div className='flex border border-white bg-black'>
          <Input
            type='email'
            placeholder='Your Email'
            className='bg-black border-none'
          />
          <Button
            type='submit'
            className='bg-orange-500 hover:bg-orange-500 w-36'
          >
            Send
          </Button>
        </div>
        <div className='flex gap-x-4'>
          <FaFacebook
            className='border border-white border-dashed rounded-full p-2'
            size={50}
          />
          <BsTwitterX
            className='border border-dashed rounded-full p-2'
            size={50}
          />
          <FaInstagram
            className='border border-dashed rounded-full p-2'
            size={50}
          />
          <FaPinterest
            className='border border-dashed rounded-full p-2'
            size={50}
          />
          <FaYoutube
            className='border border-dashed rounded-full p-2'
            size={50}
          />
        </div>
      </div>
      <div className='text-white flex flex-col gap-y-4'>
        <p className='text-xl font-medium'>
          <p>Company</p>
          <p className='w-5 h-[2px] bg-white'></p>
        </p>
        <div className='flex flex-col  gap-y-2'>
          <Link href={''}>Privacy Policy</Link>
          <Link href={''}>Returns</Link>
          <Link href={''}>Terms & Conditions</Link>
          <Link href={''}>Our Support</Link>
          <Link href={''}>Term & Services</Link>
          <Link href={''}>Checkout</Link>
          <Link href={''}>Other Issues</Link>
        </div>
      </div>
    </main>
  );
};

export default Footer;
