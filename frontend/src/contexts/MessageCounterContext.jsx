import { useState, createContext } from "react";

export const MessageCounterContext = createContext();

export const MessageCounterProvider = ({ children }) => {
    const [messageCounter, setMessageCounter] = useState(0);

    return (
        <MessageCounterContext.Provider value={{ messageCounter, setMessageCounter }}>
            {children}
        </MessageCounterContext.Provider>
    )
}