import { useEffect, useRef, useState } from 'react';
import Modal from './Modal';

function EditTaskModal({
    show,
    onClose,
    task,
    onSave,
}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] =
        useState('');
    const [status, setStatus] = useState('To do');
    const [titleError, setTitleError] =
        useState('');

    const editFormRef = useRef(null);

    useEffect(() => {
        if (!task) {
            return;
        }

        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setTitleError('');
    }, [task]);

    function validateTitle(value) {
        const trimmedTitle = value.trim();

        if (trimmedTitle === '') {
            return 'Il titolo è obbligatorio.';
        }

        const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/` + '~';

        const containsSymbol = [...value].some(
            (character) => symbols.includes(character)
        );

        if (containsSymbol) {
            return (
                'Il titolo non può contenere simboli speciali.'
            );
        }

        return '';
    }

    function handleSubmit(event) {
        event.preventDefault();

        const error = validateTitle(title);

        setTitleError(error);

        if (error) {
            return;
        }

        onSave({
            ...task,
            title: title.trim(),
            description,
            status,
        });
    }

    function handleConfirm() {
        editFormRef.current.requestSubmit();
    }

    return (
        <Modal
            title="Modifica Task"
            content={
                <form
                    ref={editFormRef}
                    className="edit-task-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-field">
                        <label htmlFor="edit-title">
                            Nome
                        </label>

                        <input
                            id="edit-title"
                            type="text"
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value);
                                setTitleError(
                                    validateTitle(event.target.value)
                                );
                            }}
                        />

                        {titleError && (
                            <p className="error-message">
                                {titleError}
                            </p>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="edit-description">
                            Descrizione
                        </label>

                        <textarea
                            id="edit-description"
                            rows="6"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="edit-status">
                            Stato
                        </label>

                        <select
                            id="edit-status"
                            value={status}
                            onChange={(event) =>
                                setStatus(event.target.value)
                            }
                        >
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="hidden-submit"
                    >
                        Salva
                    </button>
                </form>
            }
            show={show}
            onClose={onClose}
            onConfirm={handleConfirm}
            confirmText="Salva"
        />
    );
}

export default EditTaskModal;