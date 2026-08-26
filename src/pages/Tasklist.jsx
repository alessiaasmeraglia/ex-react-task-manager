import { useMemo, useState, useCallback, useEffect, useRef } from 'react';

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
    const [searchQuery, setSearchQuery] = useState('');

    const searchInputRef = useRef(null);
    const debounceTimeoutRef = useRef(null);

    const updateSearchQuery = useCallback((value) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            setSearchQuery(value);
        }, 300);
    }, []);

    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);


    const filteredAndSortedTasks = useMemo(() => {
        const normalizedQuery = searchQuery
            .trim()
            .toLowerCase();

        const filteredTasks = tasks.filter((task) => {
            if (normalizedQuery === '') {
                return true;
            }

            return task.title
                .toLowerCase()
                .includes(normalizedQuery);
        });

        const tasksCopy = [...filteredTasks];

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
                const dateA = new Date(
                    taskA.createdAt
                ).getTime();

                const dateB = new Date(
                    taskB.createdAt
                ).getTime();

                comparison = dateA - dateB;
            }

            return comparison * sortOrder;
        });

        return tasksCopy;
    }, [tasks, searchQuery, sortBy, sortOrder]);

    function handleSearchChange() {
        const value = searchInputRef.current.value;

        updateSearchQuery(value);
    }

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

            <div className="task-list-toolbar">
                <label htmlFor="task-search">
                    Cerca un task
                </label>

                <input
                    id="task-search"
                    type="text"
                    ref={searchInputRef}
                    onChange={handleSearchChange}
                    placeholder="Cerca per nome..."
                />
            </div>

            {filteredAndSortedTasks.length === 0 ? (
                <p>Nessun task trovato.</p>
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
                            {filteredAndSortedTasks.map((task) => (
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