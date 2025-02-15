import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";


interface IUserProviderValues {
    user:IUser | null;
    isLoading:boolean;
    setUser:(user:IUser|null)=>void;
    setIsLoading: Dispatch<SetStateAction<boolean>> // general setter function type from useState
}

// creating user context on type  --> IUserProviderValues
const UserContext = createContext<IUserProviderValues | undefined>(undefined)

const UserProvider = ({children}:{children:React.ReactNode}) =>{
    const [user,setUser] = useState<IUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const handleUser = async()=>{
        const user = await getCurrentUser()
        setUser(user)
        setIsLoading(false)
    }
    useEffect(()=>{
        handleUser()
    },[isLoading])
     return (
        // Getting the Provider from user context and wrapping chidren with it
        // Setting values for the user context
        <UserContext.Provider value={{user,setUser,isLoading, setIsLoading}}>
            {
                children
            }
        </UserContext.Provider>
    )
}

// useUser hook can only be used in the children of the userProvider
export const useUser = ()=>{
    const context = useContext(UserContext)
    if(context == undefined){
        throw new Error("useUser must be used within the user provider")
    }
    return context
}


export default UserProvider