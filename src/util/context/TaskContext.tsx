import {
  collection,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import React, { createContext, useContext, useState } from 'react';
import { db } from '../../../firebaseConfig';
import { Tasks } from '../../Interfaces';
interface TaskContext {
  profileTasks: Tasks[];
  getProfileTasks: () => void;
  addCleaningTask: (newTodo: {}) => Promise<any>;
}
const TasksContext = React.createContext<TaskContext>({
  profileTasks: [],
  getProfileTasks: async () => [],
  addCleaningTask: async () => {},
});
export default function (props: any) {
  const [profileTasks, setProfileTasks] = useState<Tasks[]>([]);
  const profileId = 'Lgq9YJnPLLezb1iE4xHQ';

  const addCleaningTask = async (newTodo: {}) => {
    const currDocRef = doc(db, 'profiles', profileId);

    await updateDoc(currDocRef, { todo: arrayUnion(newTodo) });
  };

  const getProfileTasks = async () => {
    const profileId = 'Lgq9YJnPLLezb1iE4xHQ';
    const ProfilesDataWithId: any[] = [];
    const docRef = doc(db, 'profiles', profileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfileTasks(docSnap.data().todo);
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };
  const contextValue = { profileTasks, getProfileTasks, addCleaningTask };

  return (
    <TasksContext.Provider value={contextValue}>
      {props.children}
    </TasksContext.Provider>
  );
}
export const useTasks = () => useContext(TasksContext);
