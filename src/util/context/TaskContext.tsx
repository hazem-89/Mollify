import {
  collection,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  deleteDoc,
  FieldValue,
  DocumentReference,
  arrayRemove,
  addDoc,
  getDocs,
} from 'firebase/firestore';
import React, { createContext, useContext, useState } from 'react';
import { db } from '../../../firebaseConfig';
import { Tasks } from '../../Interfaces';
interface TaskContext {
  profileTasks: Tasks[];
  getTasks: () => Promise<any>;
  addCleaningTask: (newTodo: {}) => Promise<any>;
  deleteProfileTasks: (a: string) => Promise<any>;
}
const TasksContext = React.createContext<TaskContext>({
  profileTasks: [],
  getTasks: async () => [],
  addCleaningTask: async () => {},
  deleteProfileTasks: async () => {},
});
export default function (props: any) {
  const [profileTasks, setProfileTasks] = useState<Tasks[]>([]);
  const profileId = 'Lgq9YJnPLLezb1iE4xHQ';

  const addCleaningTask = async (newTask: {}) => {
    try {
      await addDoc(collection(db, 'Tasks'), {
        ...newTask,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getTasks = async () => {
    const tasksDataWithId: any[] = [];
    const querySnapshot = await getDocs(collection(db, 'Tasks'));
    querySnapshot.forEach(doc => {
      const data = doc.data();
      data['id'] = doc.id;
      tasksDataWithId.push(data);
      const ProfileTasksFromDb = tasksDataWithId.filter(
        (task: Tasks) => task.profileId === profileId,
      );
      setProfileTasks(ProfileTasksFromDb);
    });
  };
  const deleteProfileTasks = async (taskId: string) => {
    await deleteDoc(doc(db, 'Tasks', taskId));
  };
  const contextValue = {
    profileTasks,
    getTasks,
    addCleaningTask,
    deleteProfileTasks,
  };

  return (
    <TasksContext.Provider value={contextValue}>
      {props.children}
    </TasksContext.Provider>
  );
}
export const useTasks = () => useContext(TasksContext);