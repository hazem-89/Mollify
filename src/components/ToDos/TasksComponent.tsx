import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTasks } from '../../util/context/AddtoDBContext';
import { Tasks } from '../../Interfaces';
import TaskCard from './TaskCard';
import { useDimensions } from '@react-native-community/hooks';
import PointsBtnIcon from '../../../assets/images/Icons/PointsBtnIcon.png';
import TaskBtnIcon from '../../../assets/images/Icons/TaskBtnIcon.png';
import TimBtnIcon from '../../../assets/images/Icons/TimBtnIcon.png';
import { AddTodoForm } from '../forms/AddTodoForm';
import Button from '../buttons/Buttons';
import { ScrollView } from 'react-native-gesture-handler';
import { loadAsync } from 'expo-font';
type TasksCategoryPageProps = {
  category: string;
};

export const TasksComponent = ({ category }: TasksCategoryPageProps) => {
  const [parent, setParent] = useState(true);
  const [items, setItems] = useState<Tasks[]>([]);
  const { getTasks, profileTasks } = useTasks();

  const tasksFromDb = profileTasks?.filter(task => task.category === category);
  const dateSortedTask = tasksFromDb.sort((task1, task2) => {
    if (new Date(task1.endTime) > new Date(task2.endTime)) {
      return -1;
    }
    return 0;
  });
  const sortedTasks = dateSortedTask.sort(a => (a.hasRequest ? 1 : -1));
  const dimensions = useDimensions();
  const [addTaskBtnClicked, setAddTaskBtnClicked] = useState<
    string | undefined
  >();
  const [selectedForm, setSelectedForm] = useState<ReactElement | undefined>();

  useEffect(() => {
    getTasks();
    handleClick(undefined);
  }, [category]);

  function handleClick(state: string | undefined) {
    setSelectedForm(<AddTodoForm category={category} />);
    setAddTaskBtnClicked(state);
  }

  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const styles = StyleSheet.create({
    container: {
      width: smallScreen ? 580 : 700,
      marginTop: smallScreen ? 5 : 15,
      padding: 20,
      maxHeight: '95%',
      zIndex: 10,
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
      width: smallScreen ? 40 : 75,
      height: smallScreen ? 40 : 75,
    },
    scrollView: {
      marginTop: smallScreen ? 50 : 90,
      width: '100%',
      minHeight: ScreenHeight,
      maxHeight: ScreenHeight,
    },
  });
  return (
    <View style={styles.container}>
      {!addTaskBtnClicked ? (
        <>
          {parent && (
            <View style={{ position: 'absolute', top: 0, left: 150 }}>
              <Button
                background="AddButtonImage"
                onPress={() => handleClick(category)}
              />
            </View>
          )}
          <View style={styles.mainView}>
            <View style={styles.iconsView}>
              <View style={{ flex: 1, maxWidth: smallScreen ? 300 : 400 }}>
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
                  width: 150,
                  alignItems: 'center',
                }}
              >
                <Image style={styles.icons} source={TimBtnIcon} />
              </View>
            </View>
            <ScrollView style={styles.scrollView} horizontal={false}>
              <View style={{ paddingBottom: 600 }}>
                {sortedTasks?.map((task: Tasks) => (
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
