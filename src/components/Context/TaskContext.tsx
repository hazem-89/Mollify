import { collection, getDoc, doc } from 'firebase/firestore';
import React, { createContext, useContext, useState } from 'react';
import { db } from '../../../firebaseConfig';
interface Tasks {
  taskTitle?: string;
  taskDescription?: string;
  points?: string;
  time?: string;
}
interface TaskContext {
  profileTasks: Tasks[];
  getProfileTasks: () => void;
}
const TasksContext = React.createContext<TaskContext>({
  profileTasks: [],
  getProfileTasks: () => [],
});
export default function (props: any) {
  const [profileTasks, setProfileTasks] = useState<Tasks[]>([]);
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
  const contextValue = { profileTasks, getProfileTasks, test };

  return (
    <TasksContext.Provider value={contextValue}>
      {props.children}
    </TasksContext.Provider>
  );
}
export const useTasks = () => useContext(TasksContext);
