import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Categories from './categories';

const HomePageBanner = () => {
  return (
    <div className='w-[50%]'>
      <p>Enjoy Organic Grocery With The Bes Quality</p>
      <p>Get your products delivered at your doorstep all day everyday</p>
      <div className='flex rounded-full border border-black p-2'>
        <Input
          className='focus-visible:ring-offset-0 focus-visible:ring-0 border-none'
          placeholder='Search Your Products...'
        />
        <Button
          variant='outline'
          className='border-none bg-orange-500 text-white rounded-full hover:bg-orange-500 hover:text-white text-lg'
        >
          Search
        </Button>
      </div>
      <div>
        <Categories />
      </div>
    </div>
  );
};

export default HomePageBanner;
