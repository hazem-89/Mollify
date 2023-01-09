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
} from 'firebase/firestore';
import React, { createContext, useContext, useState } from 'react';
import { db } from '../../../firebaseConfig';
import { Tasks } from '../../Interfaces';
interface TaskContext {
  profileTasks: Tasks[];
  getProfileTasks: () => void;
  addCleaningTask: (newTodo: {}) => Promise<any>;
  deleteProfileTasks?: (a: string) => Promise<any>;
}
const TasksContext = React.createContext<TaskContext>({
  profileTasks: [],
  getProfileTasks: async () => [],
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

  const getProfileTasks = async () => {
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

  const contextValue = {
    profileTasks,
    getProfileTasks,
    addCleaningTask,
  };

  return (
    <TasksContext.Provider value={contextValue}>
      {props.children}
    </TasksContext.Provider>
  );
}
export const useTasks = () => useContext(TasksContext);
