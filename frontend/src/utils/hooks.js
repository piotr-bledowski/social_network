import { ThemeContext } from "../contexts/ThemeContext";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

export const useTheme = () => useContext(ThemeContext); // made useTheme hook for simplicity

export const useUser = () => useContext(UserContext); // same with useUser

// a nice shortcut for fetch calls, all that is left is data processing
export const useFetch = (uri) => { // Used for GET requests unly !!!
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(uri)
            .then(data => data.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError);
    }, [uri]);

    return { loading, data, error };
}