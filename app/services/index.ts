import { IGameOwned, IRecentlyPlayedRoot, ISteamGamesOwned, ISteamSpyGameData } from "@/types/steam";
import { convertCentsToDols, imageGameSteam } from "../utils";

const spyRoute = (process.env.STEAMSPY_ROUTE || process.env.NEXT_PUBLIC_STEAMSPY_ROUTE)
const steamRoute = (process.env.STEAM_ROUTE || process.env.NEXT_PUBLIC_STEAM_ROUTE)
const steamKey = (process.env.STEAM_SECRET||process.env.NEXT_PUBLIC_STEAM_SECRET)

export const getMostPlayedOwnedGames = async (data:ISteamGamesOwned|undefined):Promise<{
    mostPlayedData:ISteamSpyGameData; 
    mostPlayedTime:IGameOwned
    ownedGames:ISteamSpyGameData[] }> => {
        if(!data){
            throw new Error("Problem to get data")
        }
        const mostPlayedTime:IGameOwned = data?.games?.reduce((prev, curr)=>{
            return (prev.playtime_forever > curr.playtime_forever) ? prev : curr;
        }) || []
        const ownedGames:ISteamSpyGameData[] = data.games && await Promise.all<ISteamSpyGameData>(data.games.map(game=>{
            return getGameData(game.appid)
        }))
        const mostPlayedData = await getGameData(mostPlayedTime.appid)
        const responseData = {mostPlayedData, mostPlayedTime, ownedGames}
        return responseData
}

export const getGameData = async(appid:number):Promise<ISteamSpyGameData> =>{
    
    const res = await fetch(`${spyRoute}?request=appdetails&appid=${appid}`, { next: { revalidate: 8000 } })
    const data = await res.json()
    
    return {...data, 
            avatarCapsule:imageGameSteam(appid), 
            avatarHeader:imageGameSteam(appid, "header"),
            price: data.price === "0" ? "Free" : convertCentsToDols(Number(data.price)) 
        };
}

export const getRecentlyPlayedGames = async(steamUserId:string):Promise<IRecentlyPlayedRoot> =>{
    const res = await fetch(`${steamRoute}IPlayerService/GetRecentlyPlayedGames/v0001/?key=${steamKey}&steamid=${steamUserId}&format=json`, { next: { revalidate: 8000 } })
    const data = await res.json()
    return data
}