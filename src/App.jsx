import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import AddTask from './pages/AddTask';
import TaskList from './pages/Tasklist';

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
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;