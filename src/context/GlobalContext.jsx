import { createContext, useContext } from 'react';
import useTasks from '../hooks/useTasks';

const GlobalContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;

export function GlobalProvider({ children }) {
    const {
        tasks,
        setTasks,
        isLoading,
        error,
        addTask,
        removeTask,
        updateTask,
        removeMultipleTasks
    } = useTasks();

    return (
        <GlobalContext.Provider
            value={{
                tasks,
                setTasks,
                isLoading,
                error,
                addTask,
                removeTask,
                updateTask,
                removeMultipleTasks
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