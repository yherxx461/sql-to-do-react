import Form from '../Form/Form';
import TasksList from '../TasksList/TasksList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Weekend To-Do List</h1>
      <h3>Add new task</h3>
      <Form />
      <TasksList />
    </div>
  );
}

export default App;
