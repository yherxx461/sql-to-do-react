import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// const [taskToggled, setTaskToggled] = useState(false);

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
            <p>{task.task}</p>
            <p>{task.completed ? 'Completed' : 'Incomplete'}</p>
            <button
              type="button"
              className="deleteTask"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
            <button
              type="button"
              className="updateStatus"
              onClick={() =>
                handleStatusUpdate(task.id, task.task, task.completed)
              }
            >
              {task.completed ? 'Incomplete' : 'Complete'}
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default TasksList;
