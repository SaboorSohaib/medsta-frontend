import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PiGreaterThanBold } from 'react-icons/pi';
import Search from './Search';

const HomePageBanner = ({
  isHome,
  title,
  from,
  to,
}: {
  isHome: boolean;
  title?: string;
  from?: string;
  to?: string;
}) => {
  const backgroundImageStyle = {
    backgroundImage:
      'url(https://ik.imagekit.io/gbfjo9pxy/bgImage_IxbhYhGpi.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: `${isHome ? '90vh' : '45vh'}`,
    color: 'white',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column' as any,
    alignItems: 'center',
    opacity: 0.9,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const backgroundImageStyleMobile = {
    backgroundImage:
      'url(https://ik.imagekit.io/gbfjo9pxy/mobileBg_loHuE9nkd.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: `${isHome ? '90vh' : '45vh'}`,
    color: 'white',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column' as any,
    alignItems: 'center',
    opacity: 0.9,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };
  return (
    <>
      {isHome ? (
        <>
          <section className="hidden sm:block">
            <section
              style={backgroundImageStyle}
              className="relative h-screen bg-cover bg-center"
            >
              <div className="absolute inset-0 bg-black opacity-75"></div>
              <div className="relative z-20 flex flex-col items-center justify-center gap-y-8 h-full lg:w-[900px] text-center text-white px-20">
                <p className="text-5xl font-bold w-full leading-[70px]">
                  Enjoy Organic Grocery With The Best Quality
                </p>
                <p className="text-2xl font-bold">
                  Get your products delivered at your doorstep all day everyday
                </p>
                <Search />
              </div>
            </section>
          </section>
          <section className="sm:hidden">
            <section
              style={backgroundImageStyleMobile}
              className="relative h-screen bg-cover bg-center"
            >
              <div className="absolute inset-0 bg-black opacity-75"></div>
              <div className="relative z-20 flex flex-col items-center justify-center gap-y-8 h-full text-center text-white px-5">
                <p className="text-5xl font-bold w-full leading-[70px]">
                  Enjoy Organic Grocery With The Best Quality
                </p>
                <p className="text-2xl font-bold">
                  Get your products delivered at your doorstep all day everyday
                </p>
                <Search />
              </div>
            </section>
          </section>
        </>
      ) : (
        <>
          <section className="hidden sm:block">
            <section
              style={backgroundImageStyle}
              className="relative h-screen bg-cover bg-center"
            >
              <div className="absolute inset-0 bg-black opacity-75"></div>
              <div className="relative z-20 flex flex-col gap-y-2 items-center justify-center h-full text-center text-white">
                <p className="text-5xl font-bold">{title}</p>
                <div className="flex items-center gap-x-2">
                  <p className="flex items-center text-1xl font-medium text-gray-300">
                    {from}
                    <PiGreaterThanBold size={10} className="ml-[2px]" />
                  </p>
                  <p className="text-1xl font-medium">{to}</p>
                </div>
              </div>
            </section>
          </section>
          <section className="sm:hidden">
            <section
              style={backgroundImageStyleMobile}
              className="relative h-screen bg-cover bg-center"
            >
              <div className="absolute inset-0 bg-black opacity-75"></div>
              <div className="relative z-20 flex flex-col gap-y-2 items-center justify-center h-full text-center text-white">
                <p className="text-5xl font-bold">{title}</p>
                <div className="flex items-center gap-x-2">
                  <p className="flex items-center text-1xl font-medium text-gray-300">
                    {from}
                    <PiGreaterThanBold size={10} className="ml-[2px]" />
                  </p>
                  <p className="text-1xl font-medium">{to}</p>
                </div>
              </div>
            </section>
          </section>
        </>
      )}
    </>
  );
};

export default HomePageBanner;
