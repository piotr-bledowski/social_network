import { createContext, useState } from "react";


export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
    const [group, setGroup] = useState(null);
    const [member, setMember] = useState(false);

    return (
        <GroupContext.Provider value={{ group, setGroup, member, setMember }}>
            {children}
        </GroupContext.Provider>
    )
}