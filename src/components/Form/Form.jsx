import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

function Form() {
  const [newTask, setNewTask] = useState({
    task: '',
    completed: '',
  });

  // const task = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const { id } = useParams();

  // Initial first load
  // useEffect(() => {
  //   // axios.get(`api/todo/${id}`);
  //   dispatch({ type: 'FETCH_NEW_TASK', payload: id });
  // }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_NEW_TASK',
      payload: { task: newTask.task, completed: false },
    });
    //clear out form
    setNewTask({ task: '' });
  };

  const handleChange = (event) => {
    console.log('In handleChange', newTask.task);

    // dispatch({
    //   type: 'SET_NEW_TASK',
    //   payload: { task, completed },
    // });
    setNewTask({ task: event.target.value, completed: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <TextField
        style={{ margin: '2px' }}
        size="small"
        type="text"
        className="new-task"
        placeholder="new task"
        onChange={handleChange}
        value={newTask.task}
      ></TextField>
      <Button
        variant="contained"
        style={{
          margin: '2px',
          marginLeft: '10px',
          backgroundColor: 'gray',
          color: 'white',
        }}
        size="medium"
        type="submit"
      >
        Add
      </Button>
    </form>
  );
}

export default Form;
