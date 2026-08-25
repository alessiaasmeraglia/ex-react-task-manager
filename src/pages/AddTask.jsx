import { useRef, useState } from 'react';

const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/` + '~';

function AddTask() {
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');

    const descriptionRef = useRef(null);
    const statusRef = useRef(null);

    function validateTitle(value) {
        const trimmedTitle = value.trim();

        if (trimmedTitle === '') {
            return 'Il nome del task è obbligatorio.';
        }

        const containsSymbol = [...value].some((character) =>
            symbols.includes(character)
        );

        if (containsSymbol) {
            return (
                'Il nome del task non può contenere simboli speciali.'
            );
        }

        return '';
    }

    function handleTitleChange(event) {
        const value = event.target.value;

        setTitle(value);
        setTitleError(validateTitle(value));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const description = descriptionRef.current.value;
        const status = statusRef.current.value;

        const error = validateTitle(title);

        setTitleError(error);

        if (error) {
            return;
        }

        const newTask = {
            title: title.trim(),
            description,
            status,
        };

        console.log('Nuovo task:', newTask);
    }

    return (
        <section className="page">
            <h1>Aggiungi un task</h1>

            <form
                className="task-form"
                onSubmit={handleSubmit}
            >
                <div className="form-field">
                    <label htmlFor="title">
                        Nome del task
                    </label>

                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Inserisci il nome del task"
                    />

                    {titleError && (
                        <p className="error-message">
                            {titleError}
                        </p>
                    )}
                </div>

                <div className="form-field">
                    <label htmlFor="description">
                        Descrizione
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        rows="6"
                        ref={descriptionRef}
                        placeholder="Inserisci una descrizione"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="status">
                        Stato
                    </label>

                    <select
                        id="status"
                        name="status"
                        ref={statusRef}
                        defaultValue="To do"
                    >
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <button type="submit">
                    Aggiungi Task
                </button>
            </form>
        </section>
    );
}

export default AddTask;