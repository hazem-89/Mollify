import { useDimensions } from '@react-native-community/hooks';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AddButtonImage from '../../../assets/images/AddButton.png';
import CountDownGreenBg from '../../../assets/images/CountDownGreenBg.png';
import PointsBtnIcon from '../../../assets/images/Icons/PointsBtnIcon.png';
import TaskBtnIcon from '../../../assets/images/Icons/TaskBtnIcon.png';
import TimBtnIcon from '../../../assets/images/Icons/TimBtnIcon.png';
import { Text } from '../../components/Text';
import { Tasks } from '../../Interfaces';
import { useDataContext } from '../../util/context/DataContext';
import { AddTodoForm } from '../forms/AddForm';
import TaskCard from './TaskCard';

type TasksCategoryPageProps = {
  category: string;
};

export const TasksComponent = ({ category }: TasksCategoryPageProps) => {
  const { tasks, loggedInProfile, selectedChild } = useDataContext();
  const [selectedForm, setSelectedForm] = useState<ReactElement | undefined>();
  const dimensions = useDimensions();
  const [sortedTasks, setSortedTasks] = useState<Tasks[]>();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const [addTaskBtnClicked, setAddTaskBtnClicked] = useState<
    string | undefined
  >();

  const sortTasks = () => {
    if (tasks.length > 0) {
      const categoryTasks = tasks.filter(
        (task: { category: string }) => task.category === category,
      );

      const dateSortedTask = categoryTasks.sort(
        (
          task1: { endTime: string | number | Date },
          task2: { endTime: string | number | Date },
        ) => {
          if (new Date(task1.endTime) > new Date(task2.endTime)) {
            return -1;
          }
          if (new Date(task1.endTime) < new Date()) {
            return -1;
          }
          return 0;
        },
      );
      const sortTasks = dateSortedTask.sort((a: { hasRequest: boolean }) =>
        a.hasRequest && loggedInProfile ? 1 : -1,
      );
      setSortedTasks(sortTasks);
    } else {
      setSortedTasks([]);
    }
  };
  useEffect(() => {
    sortTasks();
  }, [tasks]);
  function handleClick(state: string | undefined) {
    setSelectedForm(
      <AddTodoForm
        category={category}
        ParentComponent="Tasks"
        setAddTaskBtnClicked={setAddTaskBtnClicked}
      />,
    );
    setAddTaskBtnClicked(state);
  }

  const styles = StyleSheet.create({
    container: {
      width: 0.75 * ScreenWidth,
      marginTop: smallScreen ? 5 : 15,
      padding: 20,
      maxHeight: 0.9 * ScreenHeight,
      zIndex: 10,
    },
    iconsView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    icons: {
      width: 0.08 * ScreenWidth,
      height: 0.08 * ScreenWidth,
    },
    scrollView: {
      marginTop: 0.17 * ScreenHeight,
      width: 0.7 * ScreenWidth,
      maxHeight: 0.71 * ScreenHeight,
    },
  });
  return (
    <View style={styles.container}>
      {!addTaskBtnClicked ? (
        <>
          {loggedInProfile && loggedInProfile.parent && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0.3 * ScreenHeight,
                left: -0.18 * ScreenWidth,
              }}
              onPress={() => handleClick(category)}
            >
              <ImageBackground
                source={CountDownGreenBg}
                style={{
                  alignItems: 'center',
                  width: 0.16 * ScreenWidth,
                  height: 0.1 * ScreenWidth,
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={AddButtonImage}
                    style={{
                      width: smallScreen ? 40 : 50,
                      height: smallScreen ? 40 : 50,
                    }}
                  />
                  <Text type="text"> Add a task</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          <View>
            <View style={styles.iconsView}>
              <View style={{ width: 0.4 * ScreenWidth }}>
                <Image style={styles.icons} source={TaskBtnIcon} />
              </View>
              <View
                style={{
                  width: smallScreen ? 100 : 60,
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

            {sortedTasks && !sortedTasks.length && (
              <View
                style={{
                  alignItems: 'center',
                  marginTop: smallScreen ? 145 : 215,
                  height: ScreenHeight,
                }}
              >
                <Text type="header">There are no tasks to display</Text>
              </View>
            )}

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
