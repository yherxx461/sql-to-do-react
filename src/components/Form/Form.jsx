import { useState } from 'react';

function Form() {
  const [newTask, setNewTask] = useState('');
  const [completed, setCompleted] = useState('');

  const handleNewTask = (event) => {
    event.preventDefault();
    console.log('In handleNewTask', {
      task: newTask,
      completed,
    });
  };

  //   const handleOnChange = (event) => {
  // setCompleted
  //   }

  return (
    <form onSubmit={handleNewTask} className="task-form">
      <input
        type="text"
        className="new-task"
        placeholder="new task"
        // onChange={handleOnChange}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
