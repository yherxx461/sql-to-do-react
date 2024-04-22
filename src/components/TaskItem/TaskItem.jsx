// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// function TaskItem() {
//   const [newTask, setNewTask] = useState({
//     task: '',
//     completed: '',
//   });
//   const task = useSelector((state) => state.addTask);
//   const dispatch = useDispatch();

//   // Initialized the first load
//   useEffect(() => {
//     dispatch({ type: 'ADD_NEW_TASK' });
//   }, []);

//   return (
//     <div className="task-item">
//       <p></p>
//     </div>
//   );
// }

// export default TaskItem;
