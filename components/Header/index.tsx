"use client"
import { useSession } from "next-auth/react";
import React from 'react';
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";


const Header: React.FC = () => {
  
  return (
    <header className="w-full h-16 flex items-center">
      <LeftMenu/>
      <RightMenu/>
    </header>
);
}


export default Header;