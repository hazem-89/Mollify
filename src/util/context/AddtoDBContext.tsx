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
import { Tasks, Rewards } from '../../Interfaces';
interface TaskContext {
  profileTasks: Tasks[];
  profileRewards: Tasks[];
  getTasks: () => Promise<any>;
  getRewards: () => Promise<any>;
  addCleaningTask: (newTodo: {}) => Promise<any>;
  deleteProfileTasks: (a: string) => Promise<any>;
  addRewardScore: (newReward: {}) => Promise<any>;
}
const AddtoDBContext = React.createContext<TaskContext>({
  profileTasks: [],
  profileRewards: [],
  getTasks: async () => [],
  getRewards: async () => [],
  addCleaningTask: async () => {},
  deleteProfileTasks: async () => {},
  addRewardScore: async () => {},
});
export default function (props: any) {
  const [profileTasks, setProfileTasks] = useState<Tasks[]>([]);
  const [profileRewards, setProfileRewards] = useState<Tasks[]>([]);
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
  const addRewardScore = async (newRewardScore: {}) => {
    try {
      await addDoc(collection(db, 'Rewards'), {
        ...newRewardScore,
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
  const getRewards = async () => {
    const rewardsDataWithId: any[] = [];
    const querySnapshot = await getDocs(collection(db, 'Rewards'));
    querySnapshot.forEach(doc => {
      const data = doc.data();
      data['id'] = doc.id;
      rewardsDataWithId.push(data);
      const ProfileRewardsFromDb = rewardsDataWithId.filter(
        (reward: Rewards) => reward.asignedProfileId === 'pjVcsYpBE46nGlDmHmO0',
      );
      setProfileRewards(ProfileRewardsFromDb);
    });
  };
  const deleteProfileTasks = async (taskId: string) => {
    await deleteDoc(doc(db, 'Tasks', taskId));
  };
  const contextValue = {
    profileTasks,
    profileRewards,
    getTasks,
    getRewards,
    addCleaningTask,
    deleteProfileTasks,
    addRewardScore,
  };

  return (
    <AddtoDBContext.Provider value={contextValue}>
      {props.children}
    </AddtoDBContext.Provider>
  );
}
export const useTasks = () => useContext(AddtoDBContext);

