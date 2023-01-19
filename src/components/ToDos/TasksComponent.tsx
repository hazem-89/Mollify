import { useDimensions } from '@react-native-community/hooks';
import React, { ReactElement, useState } from 'react';
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
import { AddTodoForm } from '../forms/AddTodoForm';
import TaskCard from './TaskCard';

type TasksCategoryPageProps = {
  category: string;
};

export const TasksComponent = ({ category }: TasksCategoryPageProps) => {
  const { tasks, loggedInProfile } = useDataContext();
  const [selectedForm, setSelectedForm] = useState<ReactElement | undefined>();
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const categoryTasks = tasks?.filter(
    (task: { category: string }) => task.category === category,
  );
  const [addTaskBtnClicked, setAddTaskBtnClicked] = useState<
    string | undefined
  >();
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
  const sortedTasks = dateSortedTask.sort((a: { hasRequest: any }) =>
    a.hasRequest ? 1 : -1,
  );

  // Is this fetch necessary? I can't tell cause I'm not sure what the component does but the tasks are already set in the roomScreen
  // useEffect(() => {
  //   // Retrieve tasks, replace Lgq9YJnPLLezb1iE4xHQ with current profile id
  //   retrieveFSData('Tasks', 'profileId', 'Lgq9YJnPLLezb1iE4xHQ').then(
  //     (data: any) => {
  //       if (data) setTasks(data);
  //     },
  //   );
  // }, [category]);

  function handleClick(state: string | undefined) {
    setSelectedForm(
      <AddTodoForm
        category={category}
        setAddTaskBtnClicked={setAddTaskBtnClicked}
      />,
    );
    setAddTaskBtnClicked(state);
  }

  const styles = StyleSheet.create({
    container: {
      width: smallScreen ? 580 : 700,
      marginTop: smallScreen ? 5 : 15,
      padding: 20,
      maxHeight: '95%',
      zIndex: 10,
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
          {loggedInProfile && loggedInProfile.parent && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: smallScreen ? 120 : 160,
                left: smallScreen ? -135 : -185,
              }}
              onPress={() => handleClick(category)}
            >
              <ImageBackground
                source={CountDownGreenBg}
                style={{
                  alignItems: 'center',
                  width: smallScreen ? 130 : 180,
                  height: smallScreen ? 80 : 110,
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
                  <Text type="text"> Add A Task</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          <View>
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

            {!categoryTasks.length && (
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
