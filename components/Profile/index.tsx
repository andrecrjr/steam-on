import React from "react";
import Column from "../Grid/Column";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import Title from "../Title";
import RecentlyPlayedTable from "../Tables/RecentlyPlayedTable";
import FavoriteTable from "../Tables/FavoriteTable";

const ColumnProfile = async () => {
    const session = await getServerSession(getAuthOptions(undefined))

    return (<Column className='w-full md:w-3/12 md:pl-8 mb-12 md:mb-auto sticky top-20'>
                <section className='md:w-full flex flex-col '>
                    <Title tag="h1" className='text-2xl text-center text-gray-800'>{session?.user?.name}</Title>
                    <Avatar className='w-24 h-24 self-center mt-2'>
                            <AvatarImage src={session?.user?.steam.avatarfull} 
                            alt={session?.user?.username} className="hover:zoom-in-75 
                            transition-all" />
                            <AvatarFallback>{session?.user?.username}</AvatarFallback>
                    </Avatar>
                    <RecentlyPlayedTable />
                   <FavoriteTable />
                </section>
            </Column>);
};

export default ColumnProfile