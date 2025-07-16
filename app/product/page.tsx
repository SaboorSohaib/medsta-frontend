import React from 'react';
import AllProducts from '../customComponents/AllProducts';
import HomePageBanner from '../customComponents/HomePageBanner';
import Service from '../customComponents/Service';

const Products = () => {
  return (
    <main>
      <HomePageBanner isHome={false} title='Product' from='Home' to='Product' />
      <AllProducts isHomePage={false} />
      <Service />
    </main>
  );
};

export default Products;
