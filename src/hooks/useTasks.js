import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    function addTask() {
        // Verrà completata nella Milestone 6
    }

    function removeTask() {
        // Verrà completata nella Milestone 8
    }

    function updateTask() {
        // Verrà completata nella Milestone 10
    }

    return {
        tasks,
        setTasks,
        isLoading,
        error,
        addTask,
        removeTask,
        updateTask,
    };
}

export default useTasks;