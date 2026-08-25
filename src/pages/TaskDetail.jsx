import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate, useParams } from 'react-router-dom';

function TaskDetail() {
    const { taskId } = useParams();
    const navigate = useNavigate();

    const { tasks, removeTask } = useGlobalContext();

    const task = tasks.find(
        (currentTask) => String(currentTask.id) === taskId
    );

    async function handleDelete() {
        const isConfirmed = window.confirm(
            'Sei sicuro di voler eliminare questo task?'
        );
    

    if (!isConfirmed) {
        return;
    }

    try {
        await removeTask(taskId);

        alert('Task eliminato con successo.');

        navigate('/');
    } catch (error) {
        alert(error.message);
    }
}

if (!task) {
    return (
        <section className="page">
            <h1>Task non trovato</h1>

            <p>
                Non è stato possibile trovare il task richiesto.
            </p>
        </section>
    );
}

return (
    <section className="page">
        <article className="task-detail">
            <h1>{task.title}</h1>

            <div className="task-detail-content">
                <p>
                    <strong>Descrizione:</strong>
                </p>

                <p>{task.description}</p>

                <p>
                    <strong>Stato:</strong>{' '}
                    <span
                        className={`status status-${getStatusClass(
                            task.status
                        )}`}
                    >
                        {task.status}
                    </span>
                </p>

                <p>
                    <strong>Data di creazione:</strong>{' '}
                    {formatDate(task.createdAt)}
                </p>
            </div>

            <button
                className="delete-button"
                onClick={handleDelete}
            >
                Elimina Task
            </button>
        </article>
    </section>
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

export default TaskDetail;