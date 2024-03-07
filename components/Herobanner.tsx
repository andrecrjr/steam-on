import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'
import SignButton from './SignButton';

const HeroBanner = () => {
  return (
    <section className="bg-gray-800 text-white mt-12 md:px-8 md:mt-0">
      <section className="items-center md:flex md:flex-row  md:justify-between">
        <section className="md:w-1/2 py-8 px-4 lg:py-0 lg:px-4">
          <h1 className="text-4xl md:text-left font-bold pt-8 md:pt-4">Steam ON</h1>
          <p className="text-md mt-8 md:mt-4">
            Steam ON is a minimalist client that lets you access Steam data and functionalities. Use it to explore news, stats, achievements, profiles, friends, and games for any Steam user or game.
          </p>
          <SignButton />
        </section>
        <section className="md:w-1/2  relative">
          <Image
            src="/image/steam-on.jpg"
            alt="Steam logo"
            width={220}
            height={220}
            className="object-contain mx-auto md:h-[400px]"
          />
        </section>
      </section>
    </section>
  );
};

export default HeroBanner