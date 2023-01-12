import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTasks } from '../../util/context/TaskContext';
import { Tasks } from '../../Interfaces';
import TaskCard from './TaskCard';
import { useDimensions } from '@react-native-community/hooks';
import PointsBtnIcon from '../../../assets/Images/Icons/PointsBtnIcon.png';
import TaskBtnIcon from '../../../assets/Images/Icons/TaskBtnIcon.png';
import TimBtnIcon from '../../../assets/Images/Icons/TimBtnIcon.png';
import { AddTodoForm } from '../forms/AddTodoForm';
import Button from '../buttons/Buttons';
import { ScrollView } from 'react-native-gesture-handler';
type TasksCategoryPageProps = {
  category: string;
};

export const TasksComponent = ({ category }: TasksCategoryPageProps) => {
  const [parent, setParent] = useState(true);
  const { getTasks, profileTasks } = useTasks();
  useEffect(() => {
    getTasks();
  }, [category]);
  const tasksFromDb = profileTasks?.filter(task => task.category === category);
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
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const styles = StyleSheet.create({
    container: {
      width: smallScreen ? 500 : 650,
      maxWidth: 700,
      height: ScreenHeight,
      marginTop: 50,
    },
    mainView: {
      // width: smallScreen ? 500 : 700,
    },
    iconsView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    icons: {
      width: smallScreen ? 40 : 50,
      height: smallScreen ? 40 : 50,
    },
    scrollView: {
      marginTop: 50,
      width: '100%',
      minHeight: ScreenHeight,
      maxHeight: ScreenHeight,
    },
  });
  return (
    <View style={styles.container}>
      {!addTaskBtnClicked ? (
        <>
          {/* {parent && (
            <View style={{ position: 'absolute', top: 50, left: 0 }}>
              <Button
                background="AddButtonImage"
                onPress={() => handleClick(category)}
              />
            </View>
          )} */}
          <View style={styles.mainView}>
            <View style={styles.iconsView}>
              <View style={{ flex: 1, maxWidth: smallScreen ? 250 : 400 }}>
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
            <Text>{category}</Text>
            <ScrollView style={styles.scrollView} horizontal={false}>
              <View style={{ paddingBottom: 600 }}>
                {tasksFromDb?.map((task: Tasks) => (
                  <View key={task.id}>
                    <TaskCard task={task} />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </>
      ) : (
        selectedForm
      )}
    </View>
  );
};
