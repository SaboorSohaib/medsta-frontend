'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { IoSearchOutline, IoCloseSharp } from 'react-icons/io5';
import { LuUser2 } from 'react-icons/lu';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FiPhoneCall } from 'react-icons/fi';
import Search from './search';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <main className='grid grid-cols-3 gap-x-10 px-20 items-center w-full bg-white-500 h-full top-0'>
      <div className={`${isSearchOpen ? 'flex' : 'hidden'}`}>Logo</div>
      <nav className={`${isSearchOpen ? 'hidden' : 'flex justify-between'}`}>
        <Link href='/'>Home</Link>
        <Link href='/'>Shops</Link>
        <Link href='/a'>Pages</Link>
        <Link href=''>Blogs</Link>
        <Link href=''>Contact</Link>
      </nav>
      <div className='flex justify-end w-full'>
        <p className={`${isSearchOpen ? 'hidden' : 'block'}`}>Logo</p>
        <div className={`${isSearchOpen ? 'block' : 'hidden'}`}>
          <Search />
        </div>
      </div>
      <div className='flex justify-end items-center gap-x-10'>
        <IoSearchOutline
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          size={20}
          className={`cursor-pointer ${isSearchOpen ? 'hidden' : 'block'}`}
        />
        <IoCloseSharp
          size={20}
          className={`cursor-pointer ${isSearchOpen ? 'block' : 'hidden'}`}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        />
        <LuUser2 size={20} className='cursor-pointer' />
        <AiOutlineShoppingCart size={20} className='cursor-pointer' />
        <div className='flex items-center gap-x-3'>
          <FiPhoneCall size={20} className='cursor-pointer' />
          <div>
            <p>Hot Line Number</p>
            <p className='text-lg font-bold'>+880 176 1111 456</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
