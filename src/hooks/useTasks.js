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

    async function updateTask(updatedTask) {
        const response = await fetch(
            `${API_URL}/tasks/${updatedTask.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            }
        );

        if (!response.ok) {
            throw new Error(
                'Errore durante la modifica del task'
            );
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(
                data.message ||
                'Errore durante la modifica del task'
            );
        }

        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                String(task.id) === String(updatedTask.id)
                    ? data.task
                    : task
            )
        );

        return data.task;
    }

    async function removeMultipleTasks(taskIds) {
        const results = await Promise.allSettled(
            taskIds.map(async (taskId) => {
                const response = await fetch(
                    `${API_URL}/tasks/${taskId}`,
                    {
                        method: 'DELETE',
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `Errore per il task ${taskId}`
                    );
                }

                const data = await response.json();

                if (!data.success) {
                    throw new Error(
                        data.message ||
                        `Errore per il task ${taskId}`
                    );
                }

                return taskId;
            })
        );

        const successfulIds = [];
        const failedIds = [];

        results.forEach((result, index) => {
            const taskId = taskIds[index];

            if (result.status === 'fulfilled') {
                successfulIds.push(taskId);
            } else {
                failedIds.push(taskId);
            }
        });

        if (successfulIds.length > 0) {
            setTasks((currentTasks) =>
                currentTasks.filter(
                    (task) =>
                        !successfulIds.some(
                            (taskId) =>
                                String(task.id) === String(taskId)
                        )
                )
            );
        }

        if (failedIds.length > 0) {
            throw new Error(
                `Non è stato possibile eliminare i task: ${failedIds.join(
                    ', '
                )}`
            );
        }
    }

    return {
        tasks,
        setTasks,
        isLoading,
        error,
        addTask,
        removeTask,
        updateTask,
        removeMultipleTasks
    };
}

export default useTasks;