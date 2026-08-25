import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import AddTask from './pages/AddTask';
import TaskList from './pages/Tasklist';
function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;