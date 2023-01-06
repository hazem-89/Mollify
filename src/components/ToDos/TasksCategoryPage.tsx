import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTasks } from '../../util/Context/TaskContext';
import { Tasks } from '../../Interfaces';
import TaskCard from './TaskCard';
import { useDimensions } from '@react-native-community/hooks';
import PointsBtnIcon from '../../../assets/Images/Icons/PointsBtnIcon.png';
import TaskBtnIcon from '../../../assets/Images/Icons/TaskBtnIcon.png';
import TimBtnIcon from '../../../assets/Images/Icons/TimBtnIcon.png';
import { TodoMenuHeader } from './TodoMenuSign';
type TasksCategoryPageProps = {
  category: string;
};
export const TasksCategoryPage = ({ category }: TasksCategoryPageProps) => {
  const { getProfileTasks, profileTasks } = useTasks();
  const [tasks, setTasks] = useState<Tasks[]>();
  const testTags = [
    {
      category: 'School assignments',
      id: '6756e3dd-b4a0-48bb-bfd6-d1b4b7c124a3',
      pointsValue: '10',
      taskDescription: 'math assignment ',
      taskTitle: 'Garbage',
      timeValue: '2',
    },
    {
      category: 'Special tasks',
      id: '4d851206-535b-4f3c-a6f1-e9ddfab98cfb',
      pointsValue: '5',
      taskDescription: 'babysit your baby  brother 30 min  ',
      taskTitle: 'babysite ',
      timeValue: '2',
    },
    {
      category: 'Cleaning tasks',
      id: 'b154d15a-55c2-4602-9a51-765c81e37a10',
      pointsValue: '10',
      taskDescription: 'Put the dirty clothes in the laundry basket',
      taskTitle: 'Dirty clothes',
      timeValue: '2',
    },
    {
      category: 'Special Tasks',
      id: '6a116f77-2b2c-42a5-a4ae-e6c6e4353a08',
      pointsValue: '5',
      taskDescription: 'test',
      taskTitle: 'test',
      timeValue: '2',
    },
    {
      category: 'Activities',
      id: '72243674-b7a3-4100-9b15-e89a5067c669',
      pointsValue: '30',
      taskDescription: 'test',
      taskTitle: 'wrestling',
      timeValue: '2',
    },
    {
      category: 'Cleaning tasks',
      id: '3deb9f6c-4cfe-4db5-811b-a877bf09ef98',
      pointsValue: '50',
      taskDescription: 'Put the dirty clothes in the laundry basket',
      taskTitle: 'Dirty clothes',
      timeValue: '4',
    },
  ];
  // useEffect(() => {
  //   getProfileTasks();
  //   const tasksFromDb = profileTasks?.filter(
  //     task => task.category === category,
  //   );
  //   setTasks(tasksFromDb);
  // }, []);
  // console.log(profileTasks);
  const tasksFromDb = testTags?.filter(task => task.category === category);
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      minHeight: smallScreen ? 250 : 430,
      minWidth: smallScreen ? 480 : 650,
      padding: smallScreen ? 30 : 50,
      marginTop: 50,
    },
    mainView: {},
    iconsView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    icons: {
      width: smallScreen ? 40 : 50,
      height: smallScreen ? 40 : 50,
    },
  });
  return (
    <View style={styles.container}>
      {/* <TodoMenuHeader text={category} /> */}
      {/* <Text>{category}</Text> */}
      <View style={styles.mainView}>
        <View style={styles.iconsView}>
          <View style={{ flex: 1, maxWidth: smallScreen ? 250 : 300 }}>
            <Image style={styles.icons} source={TaskBtnIcon} />
          </View>
          <View style={{ width: smallScreen ? 50 : 60, alignItems: 'center' }}>
            <Image style={styles.icons} source={PointsBtnIcon} />
          </View>
          <View style={{ width: smallScreen ? 75 : 100, alignItems: 'center' }}>
            <Image style={styles.icons} source={TimBtnIcon} />
          </View>
        </View>
        {tasksFromDb?.map((task: Tasks) => (
          <View key={task.id}>
            <TaskCard task={task} />
          </View>
        ))}
      </View>
    </View>
  );
};
