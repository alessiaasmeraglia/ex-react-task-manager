import { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;

export function GlobalProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/tasks`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        'Errore nel caricamento dei task'
                    );
                }

                return response.json();
            })
            .then((data) => {
                console.log('Task ricevuti dall API:', data);
                setTasks(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                tasks,
                setTasks,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error(
            'useGlobalContext deve essere usato dentro GlobalProvider'
        );
    }

    return context;
}