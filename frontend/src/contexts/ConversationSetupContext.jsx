import { useState } from "react";
import { createContext } from "react";

// The idea behind is context is to 

export const ConversationSetupContext = createContext();

export const ConversationSetupProvider = ({children}) => {
    const [trigger, setTrigger] = useState(true);

    return (
        <ConversationSetupContext.Provider value={{trigger, setTrigger}}>
            {children}
        </ConversationSetupContext.Provider>
    )
}