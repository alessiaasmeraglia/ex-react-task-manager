import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import EditTaskModal from '../components/EditTaskModal';
import Modal from '../components/Modal';
import { useNavigate, useParams } from 'react-router-dom';


function TaskDetail() {
    const { taskId } = useParams();
    const navigate = useNavigate();

    const { tasks, removeTask, updateTask } = useGlobalContext();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const task = tasks.find(
        (currentTask) =>
            String(currentTask.id) === taskId
    );

    async function handleConfirmDelete() {
        try {
            await removeTask(taskId);

            setShowDeleteModal(false);

            alert('Task eliminato con successo.');

            navigate('/');
        } catch (error) {
            setShowDeleteModal(false);
            alert(error.message);
        }
    }

    async function handleSaveTask(updatedTask) {
        try {
            await updateTask(updatedTask);

            alert('Task modificato con successo.');

            setShowEditModal(false);
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

                <div className="task-detail-actions">
                    <button
                        className="edit-button"
                        onClick={() => setShowEditModal(true)}
                    >
                        Modifica Task
                    </button>

                    <button
                        className="delete-button"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Elimina Task
                    </button>
                </div>
            </article>
            
            <Modal
                title="Conferma eliminazione"
                content={
                    <p>
                        Sei sicuro di voler eliminare il task{' '}
                        <strong>{task.title}</strong>?
                    </p>
                }
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                confirmText="Elimina"
            />

            <EditTaskModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                task={task}
                onSave={handleSaveTask}
            />
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