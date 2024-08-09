'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

const Search = () => {
  return (
    <div className='flex border-2 border-gray-500'>
      <Input
        type='seatch'
        placeholder='Search Products'
        className='focus-visible:ring-offset-0 focus-visible:ring-0 border-none'
      />
      <Button className='rounded-none'>Search</Button>
    </div>
  );
};

export default Search;
