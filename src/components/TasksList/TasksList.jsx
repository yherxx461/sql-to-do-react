import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function TasksList() {
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks);

  useEffect(() => {
    dispatch({
      type: 'FETCH_TASKS',
    });
  }, []);

  return (
    <main>
      <section className="tasks">
        {tasks.map((task, index) => (
          <div data-testid="tasksList" key={task.id}>
            <h3>{task.name}</h3>
          </div>
        ))}
      </section>
    </main>
  );
}

export default TasksList;
