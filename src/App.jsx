import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import AddTask from './pages/AddTask';
import TaskList from './pages/Tasklist';
import TaskDetail from './pages/TaskDetail';

import { GlobalProvider } from './context/GlobalContext';

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<TaskList />}
          />

          <Route
            path="/add-task"
            element={<AddTask />}
          />

          <Route
            path="/task/:taskId"
            element={<TaskDetail />}
          />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;