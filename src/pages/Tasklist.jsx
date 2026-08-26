import { useMemo, useState } from 'react';

import { useGlobalContext } from '../context/GlobalContext';
import TaskRow from '../components/TaskRow';

const statusOrder = {
    'To do': 0,
    Doing: 1,
    Done: 2,
};

function TaskList() {
    const {
        tasks,
        isLoading,
        error,
    } = useGlobalContext();

    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);

    const sortedTasks = useMemo(() => {
        const tasksCopy = [...tasks];

        tasksCopy.sort((taskA, taskB) => {
            let comparison = 0;

            if (sortBy === 'title') {
                comparison = taskA.title.localeCompare(
                    taskB.title,
                    'it',
                    {
                        sensitivity: 'base',
                    }
                );
            }

            if (sortBy === 'status') {
                comparison =
                    statusOrder[taskA.status] -
                    statusOrder[taskB.status];
            }

            if (sortBy === 'createdAt') {
                const dateA = new Date(taskA.createdAt).getTime();
                const dateB = new Date(taskB.createdAt).getTime();

                comparison = dateA - dateB;
            }

            return comparison * sortOrder;
        });

        return tasksCopy;
    }, [tasks, sortBy, sortOrder]);

    function handleSort(column) {
        if (sortBy === column) {
            setSortOrder((currentOrder) => currentOrder * -1);
            return;
        }

        setSortBy(column);
        setSortOrder(1);
    }

    function getSortIndicator(column) {
        if (sortBy !== column) {
            return '';
        }

        return sortOrder === 1 ? ' ↑' : ' ↓';
    }

    if (isLoading) {
        return (
            <section className="page">
                <h1>Lista dei task</h1>
                <p>Caricamento dei task...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="page">
                <h1>Lista dei task</h1>
                <p className="error-message">{error}</p>
            </section>
        );
    }

    return (
        <section className="page">
            <h1>Lista dei task</h1>

            {tasks.length === 0 ? (
                <p>Non ci sono task disponibili.</p>
            ) : (
                <div className="table-wrapper">
                    <table className="tasks-table">
                        <thead>
                            <tr>
                                <th>
                                    <button
                                        type="button"
                                        className="sort-button"
                                        onClick={() => handleSort('title')}
                                    >
                                        Nome
                                        {getSortIndicator('title')}
                                    </button>
                                </th>

                                <th>
                                    <button
                                        type="button"
                                        className="sort-button"
                                        onClick={() => handleSort('status')}
                                    >
                                        Stato
                                        {getSortIndicator('status')}
                                    </button>
                                </th>

                                <th>
                                    <button
                                        type="button"
                                        className="sort-button"
                                        onClick={() =>
                                            handleSort('createdAt')
                                        }
                                    >
                                        Data di creazione
                                        {getSortIndicator('createdAt')}
                                    </button>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {sortedTasks.map((task) => (
                                <TaskRow
                                    key={task.id}
                                    task={task}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default TaskList;