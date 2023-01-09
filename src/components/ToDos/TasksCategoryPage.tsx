import { StyleSheet, Text, View, Image } from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTasks } from '../../util/Context/TaskContext';
import { Tasks } from '../../Interfaces';
import TaskCard from './TaskCard';
import { useDimensions } from '@react-native-community/hooks';
import PointsBtnIcon from '../../../assets/Images/Icons/PointsBtnIcon.png';
import TaskBtnIcon from '../../../assets/Images/Icons/TaskBtnIcon.png';
import TimBtnIcon from '../../../assets/Images/Icons/TimBtnIcon.png';
import { AddTodoForm } from '../forms/AddTodoForm';
import Button from '../buttons/Buttons';
type TasksCategoryPageProps = {
  category: string;
};

const mockedTasksCategory = [
  {
    category: 'Cleaning tasks',
    endTime: 'Fri Jan 13 2023 12:00:00 GMT+0100 (CET)',
    hasRequest: false,
    id: 'a50bab81-b002-4e55-afe1-72d3760a3079',
    isDone: false,
    pointsValue: '50',
    taskDescription: 'Put the dirty clothes in the laundry basket',
    taskTitle: 'Dirty clothes',
  },
  {
    category: 'Cleaning tasks',
    endTime: 'Thu Jan 12 2023 12:00:00 GMT+0100 (CET)',
    hasRequest: false,
    id: 'fb1adc8c-ddc7-41ce-9c65-2824b0c77d25',
    isDone: false,
    pointsValue: '10',
    taskDescription: 'Take the dishes to the kitchen',
    taskTitle: 'Dirty Dishes',
  },
  {
    category: 'Cleaning tasks',
    endTime: 'Tue Jan 09 2023 12:00:00 GMT+0100 (CET)',
    hasRequest: false,
    id: 'aa918fad-646b-4958-9e3f-382e180123a4',
    isDone: false,
    pointsValue: '500',
    taskDescription: 'Not too much not too little water',
    taskTitle: 'Watering Plants',
  },
];
export const TasksCategoryPage = ({ category }: TasksCategoryPageProps) => {
  const { getProfileTasks, profileTasks } = useTasks();
  const [tasks, setTasks] = useState<Tasks[]>();

  // useEffect(() => {
  //   getProfileTasks();
  //   const tasksFromDb = profileTasks?.filter(
  //     task => task.category === category,
  //   );
  //   setTasks(tasksFromDb);
  // }, []);
  // console.log(profileTasks);
  const tasksFromDb = mockedTasksCategory?.filter(
    task => task.category === category,
  );
  const dimensions = useDimensions();
  const [addTaskBtnClicked, setAddTaskBtnClicked] = useState<
    string | undefined
  >();
  const [selectedForm, setSelectedForm] = useState<ReactElement | undefined>();
  function handleClick(state: string | undefined) {
    setAddTaskBtnClicked(state);
    switch (state) {
      case 'Activities':
        setSelectedForm(<AddTodoForm category="Activities" />);
        break;
      case 'Cleaning tasks':
        setSelectedForm(<AddTodoForm category="Cleaning tasks" />);
        break;
      case 'School assignments':
        setSelectedForm(<AddTodoForm category="School assignments" />);
        break;
      case 'Special tasks':
        setSelectedForm(<AddTodoForm category="Special tasks" />);
        break;
      default:
    }
  }
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      minHeight: smallScreen ? 250 : 430,
      minWidth: smallScreen ? 480 : 650,
      padding: smallScreen ? 30 : 50,
      marginTop: 20,
      paddingBottom: 500,
    },
    mainView: {},
    iconsView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      maxWidth: smallScreen ? 350 : 550,
      marginLeft: smallScreen ? 30 : 50,
    },
    icons: {
      width: smallScreen ? 40 : 50,
      height: smallScreen ? 40 : 50,
    },
  });
  return (
    <View style={styles.container}>
      {!addTaskBtnClicked ? (
        <>
          <View style={{ position: 'absolute', top: 0, left: 0 }}>
            <Button
              background="AddButtonImage"
              onPress={() => handleClick(category)}
            />
          </View>
          <View style={styles.mainView}>
            <View style={styles.iconsView}>
              <View style={{ flex: 1, maxWidth: smallScreen ? 250 : 300 }}>
                <Image style={styles.icons} source={TaskBtnIcon} />
              </View>
              <View
                style={{
                  width: smallScreen ? 50 : 60,
                  alignItems: 'center',
                }}
              >
                <Image style={styles.icons} source={PointsBtnIcon} />
              </View>
              <View
                style={{
                  width: smallScreen ? 75 : 100,
                  alignItems: 'center',
                }}
              >
                <Image style={styles.icons} source={TimBtnIcon} />
              </View>
            </View>
            {tasksFromDb?.map((task: Tasks) => (
              <View key={task.id}>
                <TaskCard task={task} />
              </View>
            ))}
          </View>
        </>
      ) : (
        selectedForm
      )}
    </View>
  );
};
