
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Column from '../Grid/Column';
import Image from 'next/image';
import ProfileIcon from '../icons/UserProfile';
import Title from '../Title';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';


const LibraryTable: React.FC = async () => {
    const session = await getServerSession(getAuthOptions(undefined))
    if(!!session)
        return( <Column className='w-screen md:w-full min-h-6 md:pr-6'>
            <section className='flex ml-4 mb-8'>
                <ProfileIcon />
                <Title className='pl-2' tag="h2">Game Profile</Title>
            </section>
            <Table className='min-w-[700px] h-screen md:w-full'>
                <TableCaption>Games Library</TableCaption>
                <TableHeader>
                    {<TableRow>
                        <TableHead className='min-w-32'></TableHead>
                        <TableHead className='min-w-40'>Name</TableHead>
                        <TableHead>Game Studio</TableHead>
                        <TableHead>Genres</TableHead>
                   </TableRow>}
                </TableHeader>
                <TableBody className='overflow-x-scroll'>
                    {!!session.user.gamesLibraryData && session.user?.gamesLibraryData?.ownedGames.map(game=><TableRow key={game.appid}>
                        {game.avatarCapsule && <TableCell >
                            <Image alt={game.name} 
                                src={game.avatarCapsule} width="112" height={"60"}>
                            </Image>
                        </TableCell>}
                        <TableCell >
                            <Link href={`/game/${game.appid}`} passHref>{game.name}</Link>
                        </TableCell>
                        <TableCell >{game.developer}</TableCell>
                        <TableCell>{game.genre}</TableCell>
                    </TableRow>)}
                </TableBody>
                </Table>
            </Column>);

    return <p>Loading</p>
}

export default LibraryTable;