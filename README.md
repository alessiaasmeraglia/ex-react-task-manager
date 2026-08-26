# Task Manager Avanzato

> Applicazione web per creare, modificare, organizzare ed eliminare task con filtri, ricerca, ordinamento, modali e gestione dello stato globale.

## Informazioni

| Voce | Dettaglio |
| --- | --- |
| Repository | `ex-react-task-manager` |
| Backend | [react-task-manager-back](https://github.com/boolean-it/react-task-manager-back) |
| Tecnologie | React, Vite, React Router, Context API, Hooks |

## Setup

### Backend

Clonare e avviare il backend:

```bash
git clone https://github.com/boolean-it/react-task-manager-back.git
cd react-task-manager-back
npm install
npm run start
```

### Frontend

Creare il progetto con Vite e installare le dipendenze:

```bash
npm create vite@latest
npm install
npm install react-router-dom dayjs
```

## Milestone 1 - Setup e routing

- Configurare il frontend con Vite.
- Installare `react-router-dom`.
- Creare il router principale in `App.jsx` usando `BrowserRouter`.
- Creare le pagine `TaskList.jsx` e `AddTask.jsx`.
- Aggiungere una barra di navigazione con `NavLink`.
- Definire le rotte con `Routes` e `Route`.

Rotte iniziali:

| Percorso | Componente |
| --- | --- |
| `/` | `TaskList.jsx` |
| `/add-task` | `AddTask.jsx` |

## Milestone 2 - Context API e fetch iniziale

Creare `GlobalContext` per gestire lo stato globale dell’applicazione.

Il provider deve:

- contenere lo stato dei task;
- effettuare una richiesta `GET /tasks` al caricamento tramite `useEffect`;
- salvare la risposta nello stato;
- stampare in console i dati ricevuti;
- avvolgere l’intera applicazione in `App.jsx`.

## Milestone 3 - Lista dei task

In `TaskList.jsx`, recuperare i task dal `GlobalContext` e mostrarli in una tabella con le colonne:

- Nome;
- Stato;
- Data di creazione.

Creare `TaskRow.jsx` per rappresentare una singola riga. Mostrare soltanto `title`, `status` e `createdAt`, escludendo `description`.

Usare `React.memo()` su `TaskRow.jsx`.

Colorare la cella dello stato:

| Stato | Colore |
| --- | --- |
| `To do` | Rosso |
| `Doing` | Giallo |
| `Done` | Verde |

## Milestone 4 - Custom hook `useTasks()`

Creare `useTasks()` per centralizzare la gestione dei task.

Il hook deve:

- recuperare i task iniziali con `GET /tasks`;
- salvarli in uno stato locale;
- definire `addTask`, `removeTask` e `updateTask`;
- restituire lista e funzioni di gestione;
- essere integrato nel `GlobalContext`.

## Milestone 5 - Form per aggiungere un task

Aggiornare `AddTask.jsx` con:

- `title`: input controllato con `useState`;
- `description`: textarea non controllata con `useRef`;
- `status`: select non controllata con `useRef`, predefinita su `To do`.

### Validazione del titolo

Il titolo:

- non può essere vuoto;
- non può contenere simboli speciali.

Costante di riferimento:

```js
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";
```

Nella prima fase, il submit deve soltanto stampare in console l’oggetto task.

## Milestone 6 - POST di un task

Completare `addTask` in `useTasks()`.

Inviare una richiesta `POST /tasks` con body JSON contenente:

```js
{
  title,
  description,
  status
}
```

Risposta attesa:

```js
{ success: true, task: /* task creata */ }
{ success: false, message: "Messaggio di errore" }
```

Se `success` è `true`, aggiungere il task allo stato. Se è `false`, lanciare un errore con il relativo `message`.

In `AddTask.jsx`:

- chiamare `addTask` al submit;
- mostrare un alert di conferma se l’operazione riesce;
- resettare il form;
- mostrare un alert con l’errore in caso di fallimento.

## Milestone 7 - Dettaglio task

Creare `TaskDetail.jsx` e aggiungere la rotta:

```txt
/task/:id
```

In `TaskRow.jsx`, rendere il titolo un link verso `/task/:id`.

Il dettaglio deve mostrare:

- `title`;
- `description`;
- `status`;
- `createdAt`;
- bottone `Elimina Task`.

In questa fase il bottone può stampare soltanto `Elimino task` in console.

## Milestone 8 - Eliminazione task

Completare `removeTask` in `useTasks()`.

Inviare:

```txt
DELETE /tasks/:id
```

Risposta attesa:

```js
{ success: true }
{ success: false, message: "Messaggio di errore" }
```

Se l’operazione riesce:

- rimuovere il task dallo stato;
- mostrare un alert di conferma;
- reindirizzare alla lista `/`.

In caso di errore, mostrare un alert con il messaggio ricevuto.

## Milestone 9 - Modale di conferma

Creare `Modal.jsx` con `ReactDOM.createPortal`.

Props richieste:

| Prop | Descrizione |
| --- | --- |
| `title` | Titolo della modale |
| `content` | Contenuto principale |
| `show` | Visibilità della modale |
| `onClose` | Chiusura della modale |
| `onConfirm` | Azione di conferma |
| `confirmText` | Testo del bottone, default `Conferma` |

La modale deve contenere i bottoni `Annulla` e `Conferma`.

Integrare la modale in `TaskDetail.jsx`: il click su `Elimina Task` apre la conferma, mentre `Conferma` esegue la procedura di eliminazione.

## Milestone 10 - Modifica task

Completare `updateTask` in `useTasks()` con una richiesta:

```txt
PUT /tasks/:id
```

Body: oggetto con i dati aggiornati.

Creare `EditTaskModal.jsx` con le props:

- `show`;
- `onClose`;
- `task`;
- `onSave`.

Usare `Modal` con:

- `title`: `Modifica Task`;
- `content`: form di modifica;
- `confirmText`: `Salva`.

Il form deve contenere campi controllati tramite `useState`:

- `title`;
- `description`;
- `status`, con opzioni `To do`, `Doing`, `Done`.

Usare una ref associata al form per attivare il submit dalla modale:

```js
editFormRef.current.requestSubmit();
```

Al salvataggio:

- chiamare `updateTask`;
- mostrare un alert di conferma;
- chiudere la modale;
- mostrare un alert di errore se la richiesta fallisce.

## Milestone 11 - Ordinamento

In `TaskList.jsx`, creare:

```js
const [sortBy, setSortBy] = useState('createdAt');
const [sortOrder, setSortOrder] = useState(1);
```

Rendere cliccabili le intestazioni della tabella.

- Se la colonna è già selezionata, invertire `sortOrder`.
- Se è una nuova colonna, impostarla e usare ordine crescente `1`.

Usare `useMemo()` per ordinare l’array solo quando cambiano `tasks`, `sortBy` o `sortOrder`.

Criteri:

- `title`: `localeCompare`;
- `status`: `To do` < `Doing` < `Done`;
- `createdAt`: confronto tramite valore numerico della data e `.getTime()`.

## Milestone 12 - Ricerca con debounce

Aggiungere sopra la tabella un campo di ricerca.

Creare `searchQuery` con `useState` e filtrare i task in modo case insensitive.

L’array finale deve essere prima filtrato e poi ordinato con `useMemo()`.

Implementare il debounce tramite `setTimeout()` e `useCallback()`.

> [!IMPORTANT]
> L’input deve essere non controllato: rimuovere `value` dall’input e usare il debounce per aggiornare `searchQuery` dopo una breve pausa.

## Bonus 1 - Selezione ed eliminazione multipla

### `TaskRow.jsx`

Aggiungere le props:

- `checked`;
- `onToggle`.

Inserire una checkbox controllata vicino al titolo e chiamare `onToggle(task.id)` al click.

### `TaskList.jsx`

Creare:

```js
const [selectedTaskIds, setSelectedTaskIds] = useState([]);
```

Implementare `toggleSelection(taskId)` per aggiungere o rimuovere un ID.

Mostrare `Elimina Selezionate` soltanto quando esiste almeno una selezione.

### `useTasks.js`

Creare `removeMultipleTasks(ids)`:

- inviare richieste `DELETE /tasks/{id}` in parallelo;
- usare `Promise.allSettled()`;
- rimuovere dallo stato ogni task eliminata correttamente;
- lanciare un errore con gli ID non eliminati se una o più richieste falliscono.

Dopo il successo:

- mostrare un alert;
- svuotare `selectedTaskIds`.

## Bonus 2 - Personalizzazione e reducer

### Formattazione delle date

Installare `dayjs`:

```bash
npm install dayjs
```

In `TaskRow.jsx` e `TaskDetail.jsx`, formattare le date in italiano:

```js
dayjs(createdAt).format('DD/MM/YYYY')
```

### Validazione dei nomi duplicati

Aggiornare `addTask` e `updateTask` per controllare, prima della chiamata API, se esiste già un task con lo stesso nome.

Se il nome è già presente:

- lanciare un errore;
- impedire la creazione o modifica.

### `useReducer` per i task

Sostituire `useState` con `useReducer` in `useTasks.js`.

Creare `tasksReducer.js` con le azioni:

- `LOAD_TASKS`;
- `ADD_TASK`;
- `REMOVE_TASK`;
- `UPDATE_TASK`;
- `REMOVE_MULTIPLE_TASKS`.

Aggiornare fetch iniziale e funzioni CRUD affinché modifichino lo stato tramite `dispatch`.

## Struttura progetto

```txt
src/
├── components/
│   ├── EditTaskModal.jsx
│   ├── Modal.jsx
│   └── TaskRow.jsx
├── contexts/
│   └── GlobalContext.jsx
├── hooks/
│   └── useTasks.js
├── pages/
│   ├── AddTask.jsx
│   ├── TaskDetail.jsx
│   └── TaskList.jsx
├── reducers/
│   └── tasksReducer.js
├── App.jsx
└── main.jsx
```