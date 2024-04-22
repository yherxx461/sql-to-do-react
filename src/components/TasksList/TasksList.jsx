import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// const [taskToggled, setTaskToggled] = useState(false);

function TasksList() {
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks);
  const deleteTask = useSelector((store) => store.deleteTask);
  const [task, setTask] = useState(tasks.task);
  const [completed, setCompleted] = useState(tasks.completed);

  useEffect(() => {
    dispatch({
      type: 'FETCH_ALL_TASKS',
    });
  }, [dispatch]);

  // const handleClickToggle = (taskData) => {
  //   const toggleTask = (taskData) => {
  //     console.log('in handleClickToggle() - taskData:', taskToggled);
  //     setTask;
  //   };
  // };

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
            <p>{task.completed}</p>
            <button
              type="button"
              className="deleteTask"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default TasksList;
