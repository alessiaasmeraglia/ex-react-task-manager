import { useGlobalContext } from '../context/GlobalContext';
import TaskRow from '../components/TaskRow';

function TaskList() {
    const { tasks } = useGlobalContext();

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
                                <th>Nome</th>
                                <th>Stato</th>
                                <th>Data di creazione</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tasks.map((task) => (
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