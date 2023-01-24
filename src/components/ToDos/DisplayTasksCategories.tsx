import { useDimensions } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import GoBackArrow from '../../../assets/images/GoBackArrow.png';
import GoldenArrow from '../../../assets/images/GoldenArrow.png';
import ActivityIcon from '../../../assets/images/Icons/ActivityIcon.png';
import SchoolTasksIcon from '../../../assets/images/Icons/SchoolTasksIcon.png';
import SpecialTaskIcon from '../../../assets/images/Icons/SpecialTaskIcon.png';
import TasksCategoryTitleBackGround from '../../../assets/images/TasksCategoryTitleBackGround1.png';
import TasksCategoryTitleBackGroundActive from '../../../assets/images/TasksCategoryTitleBackGroundActive1.png';
import TodoButtonImage from '../../../assets/images/todo.png';
import { Text } from '../../components/Text';
import { Tasks } from '../../Interfaces';
import { useDataContext } from '../../util/context/DataContext';
import { TasksComponent } from './TasksComponent';

const tasksCategories = [
  {
    title: 'Room',
    background: TodoButtonImage,
    displayName: 'Room tasks',
    length: 0,
  },
  {
    title: 'Special',
    background: SpecialTaskIcon,
    displayName: 'Special tasks',
    length: 0,
  },
  {
    title: 'School',
    background: SchoolTasksIcon,
    displayName: 'Study tasks',
    length: 0,
  },
  {
    title: 'Activities',
    background: ActivityIcon,
    displayName: 'Activities',
    length: 0,
  },
];

// This Render the categories buttons and the category task based on the chosen category that saved in the text state
export const DisplayTasksCategories = () => {
  const [text, setText] = useState<string | undefined>();
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const dimensions = useDimensions();
  const navigation = useNavigation();
  const { retrieveFSData, tasks, setTasks, selectedChild, loggedInProfile } =
    useDataContext();

  useEffect(() => {
    let profileID = '';
    if (selectedChild) {
      profileID = selectedChild.id;
    } else if (loggedInProfile) {
      profileID = loggedInProfile.id;
    }
    retrieveFSData('Tasks', 'profileId', profileID).then((data: any) => {
      data ? setTasks(data) : setTasks([]);
    });
    setCategoryLength();
  }, [text]);
  const handelGoBack = () => {
    navigation.goBack();
  };
  const setCategoryLength = () => {
    tasksCategories.forEach(category => {
      category.length = 0;
    });
    tasks?.forEach((task: Tasks) => {
      tasksCategories.forEach(category => {
        if (task.category === category.title) {
          category.length += 1;
        }
      });
    });
  };

  const [smallScreen] = useState(dimensions.screen.height < 600);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: ScreenWidth,
      maxWidth: ScreenWidth,
      height: ScreenHeight,
      flexDirection: 'row',
    },
    categoriesContainer: {
      height: ScreenHeight,
      marginTop: smallScreen ? 28 : 50,
      alignItems: 'center',
      minWidth: smallScreen ? 150 : 200,
      marginLeft: 25,
    },
    categoryView: {
      minHeight: smallScreen ? 80 : 120,
    },
    categoryViewHidden: {
      display: 'none',
    },
    CategoryTitleBg: {
      width: smallScreen ? 140 : 195,
      height: smallScreen ? 85 : 120,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
    },
    CategoryDetail: {
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: smallScreen ? 60 : 105,
    },
    CategoryIcon: {
      width: smallScreen ? 30 : 70,
      height: smallScreen ? 30 : 70,
    },
    GoldenArrow: {
      width: smallScreen ? 350 : 500,
      height: smallScreen ? 150 : 200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tasksLength: {
      position: 'absolute',
      backgroundColor: 'rgba(86, 222, 245, 1)',
      width: smallScreen ? 20 : 30,
      height: smallScreen ? 20 : 30,
      alignItems: 'center',
      zIndex: 99,
      left: smallScreen ? 140 : 190,
      borderRadius: 50,
    },
    GoBackButton: {
      position: 'absolute',
      right: 30,
      top: smallScreen ? 30 : 40,
    },
    GoBackArrowImageStyle: {
      width: smallScreen ? 150 : 200,
      height: smallScreen ? 75 : 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        {tasksCategories.map(taskCategory => {
          return (
            <View
              key={taskCategory.title}
              style={
                text && text !== taskCategory.title
                  ? styles.categoryViewHidden
                  : styles.categoryView
              }
            >
              <TouchableOpacity
                onPress={() => {
                  setText(
                    text && text === taskCategory.title
                      ? undefined
                      : taskCategory.title,
                  );
                }}
              >
                <ImageBackground
                  source={
                    text && text === taskCategory.title
                      ? TasksCategoryTitleBackGroundActive
                      : TasksCategoryTitleBackGround
                  }
                  style={styles.CategoryTitleBg}
                >
                  <View style={styles.CategoryDetail}>
                    {text && text === taskCategory.title ? (
                      <></>
                    ) : (
                      <Image
                        source={taskCategory.background}
                        style={styles.CategoryIcon}
                      />
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        type={
                          text && text === taskCategory.title
                            ? 'categoryTitles'
                            : 'text'
                        }
                      >
                        {taskCategory.displayName}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              {taskCategory.length ? (
                <>
                  <View style={styles.tasksLength}>
                    <Text type="NotificationNum">{taskCategory.length}</Text>
                  </View>
                </>
              ) : null}
            </View>
          );
        })}
      </View>
      {text && (
        <View style={{ position: 'absolute', bottom: 40, left: 30 }}>
          <TouchableOpacity onPress={() => setText(undefined)}>
            <ImageBackground
              source={GoldenArrow}
              style={{
                width: smallScreen ? 150 : 200,
                height: smallScreen ? 60 : 85,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View style={{ marginLeft: smallScreen ? 15 : 20 }}>
                <Text type="text">All categories</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )}
      {text ? (
        <>
          <View style={{ flex: 1 }}>
            <TasksComponent category={text} />
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              minHeight: '50%',
            }}
          >
            <ImageBackground source={GoldenArrow} style={styles.GoldenArrow}>
              <View style={{ marginLeft: smallScreen ? 15 : 20 }}>
                <Text type="header">Select a category</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.GoBackButton}>
            <TouchableOpacity onPress={handelGoBack}>
              <ImageBackground
                source={GoBackArrow}
                style={styles.GoBackArrowImageStyle}
              >
                <View style={{ marginRight: 50 }}>
                  <Text type="header">Room</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};
