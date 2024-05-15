import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Material UI
import { IconButton, Card, Grid } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import './TasksList.css';

function TasksList() {
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks);

  useEffect(() => {
    dispatch({
      type: 'FETCH_ALL_TASKS',
    });
  }, [dispatch]);

  const handleStatusUpdate = (taskId, task, completed) => {
    // Toggle task completion status
    const toggleTaskCompletion = !completed;
    // Dispatch action to update task status
    dispatch({
      type: 'UPDATE_STATUS',
      payload: { id: taskId, task, completed: toggleTaskCompletion },
    });
  };

  const handleDelete = (taskId) => {
    // console.log('in handleDelete');
    dispatch({
      type: 'DELETE_TASK',
      payload: { id: taskId },
    });
  };

  return (
    <main>
      <section className="tasks">
        {tasks.map((task) => (
          <div className="tasksList" key={task.id}>
            <Card
              className="card"
              sx={{ maxWidth: 215 }}
              style={{
                flexDirection: 'column',
                backgroundColor: 'whitesmoke',
                fontFamily: 'monospace',
              }}
            >
              <p>Task: {task.task}</p>
              <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
              <IconButton>
                <DeleteRoundedIcon
                  style={{ color: 'red' }}
                  type="button"
                  className="deleteTask"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </DeleteRoundedIcon>
              </IconButton>
              <IconButton>
                <DoneIcon
                  style={{ color: task.completed ? 'green' : 'red' }}
                  type="button"
                  className="updateStatus"
                  onClick={() =>
                    handleStatusUpdate(task.id, task.task, task.completed)
                  }
                >
                  {task.completed ? 'Incomplete' : 'Complete'}
                </DoneIcon>
              </IconButton>
            </Card>
          </div>
        ))}
      </section>
    </main>
  );
}

export default TasksList;
