import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';
import { Text } from '../../components/Text';
import { TasksComponent } from './TasksComponent';
import TasksCategoryTitleBackGround from '../../../assets/images/TasksCategoryTitleBackGround1.png';
import TasksCategoryTitleBackGroundActive from '../../../assets/images/TasksCategoryTitleBackGroundActive1.png';
import SchoolTasksIcon from '../../../assets/images/Icons/SchoolTasksIcon.png';
import TodoButtonImage from '../../../assets/images/todo.png';
import GoldenArrow from '../../../assets/images/GoldenArrow.png';
import SpecialTaskIcon from '../../../assets/images/Icons/SpecialTaskIcon.png';
import ActivityIcon from '../../../assets/images/Icons/ActivityIcon.png';
import Button from '../buttons/Buttons';
const tasksCategories = [
  {
    title: 'Room',
    background: TodoButtonImage,
    displayName: 'Clean Your Room!',
  },
  {
    title: 'Special',
    background: SpecialTaskIcon,
    displayName: 'Extra For You!',
  },
  {
    title: 'School',
    background: SchoolTasksIcon,
    displayName: 'Extra Study?!',
  },
  {
    title: 'Activities',
    background: ActivityIcon,
    displayName: 'More Practice!',
  },
];
// This Render the categories buttons and the category task based on the chosen category that saved in the text state
export const DisplayTasksCategories = () => {
  const [text, setText] = useState<string | undefined>();
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const dimensions = useDimensions();
  const [test, setTest] = useState(false);
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
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
      // justifyContent: 'center',
      marginTop: smallScreen ? 30 : 50,
      alignItems: 'center',
      minWidth: smallScreen ? 150 : 200,
      marginLeft: 25,
    },
    categoryView: {
      minHeight: smallScreen ? 80 : 120,
      // alignSelf: 'flex-start',
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
      width: smallScreen ? 450 : 600,
      height: smallScreen ? 200 : 250,
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
                            ? 'header'
                            : 'text'
                        }
                      >
                        "
                      </Text>
                      <Text
                        type={
                          text && text === taskCategory.title
                            ? 'categoryTitles'
                            : 'text'
                        }
                      >
                        {taskCategory.displayName}
                      </Text>
                      <Text
                        type={
                          text && text === taskCategory.title
                            ? 'header'
                            : 'text'
                        }
                      >
                        "
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      {text && (
        <View style={{ position: 'absolute', bottom: 40, left: 30 }}>
          <Button
            background="Cancel"
            text="All categories"
            onPress={() => setText(undefined)}
          />
        </View>
      )}
      {text ? (
        <>
          <View style={{ flex: 1 }}>
            <TasksComponent category={text} />
          </View>
        </>
      ) : (
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
              <Text type="header">Pleas Select a Category</Text>
            </View>
          </ImageBackground>
        </View>
      )}
    </View>
  );
};
