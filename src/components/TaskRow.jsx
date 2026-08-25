import { memo } from 'react';

function TaskRow({ task }) {
    return (
        <tr>
            <td>{task.title}</td>

            <td>
                <span className={`status status-${getStatusClass(task.status)}`}>
                    {task.status}
                </span>
            </td>

            <td>{formatDate(task.createdAt)}</td>
        </tr>
    );
}

function getStatusClass(status) {
    if (status === 'To do') {
        return 'todo';
    }

    if (status === 'Doing') {
        return 'doing';
    }

    if (status === 'Done') {
        return 'done';
    }

    return 'unknown';
}

function formatDate(dateValue) {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return 'Data non disponibile';
    }

    return date.toLocaleDateString('it-IT');
}

export default memo(TaskRow);