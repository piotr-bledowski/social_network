import { useState } from "react";
import { createContext } from "react";

// The idea behind is context is to make sure the message list is scrolled down
// all the way to the bottom

export const ConversationSetupContext = createContext();

export const ConversationSetupProvider = ({children}) => {
    const [setupTrigger, setSetupTrigger] = useState(true);

    return (
        <ConversationSetupContext.Provider value={{setupTrigger, setSetupTrigger}}>
            {children}
        </ConversationSetupContext.Provider>
    )
}