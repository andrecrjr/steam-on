import { getServerSession } from "next-auth";
import { getAuthOptions } from "../api/auth/[...nextauth]/route";
import RootLayout from "../layout";

export async function generateMetadata() {
    const session = await getServerSession(getAuthOptions(undefined))
     return {
        title:`${session?.user.name}'s Page`,
        description: `Game's Library from ${session?.user.name}`
     }
}

export default RootLayout