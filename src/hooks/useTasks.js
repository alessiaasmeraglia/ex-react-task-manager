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

    async function addTask(newTask) {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });

        if (!response.ok) {
            throw new Error(
                'Errore durante la creazione del task'
            );
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(
                data.message || 'Errore durante la creazione del task'
            );
        }

        setTasks((currentTasks) => [
            ...currentTasks,
            data.task,
        ]);

        return data.task;
    }

    async function removeTask(taskId) {
        const response = await fetch(
            `${API_URL}/tasks/${taskId}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error(
                'Errore durante l’eliminazione del task'
            );
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(
                data.message ||
                'Errore durante l’eliminazione del task'
            );
        }

        setTasks((currentTasks) =>
            currentTasks.filter(
                (task) => String(task.id) !== String(taskId)
            )
        );
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