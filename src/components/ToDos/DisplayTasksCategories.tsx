import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';
import { Text } from '../../components/Text';
import { TasksComponent } from './TasksComponent';
import TasksCategoryTitleBackGround from '../../../assets/Images/TasksCategoryTitleBackGround.png';
import TasksCategoryTitleBackGroundActive from '../../../assets/Images/TasksCategoryTitleBackGroundActive.png';
import SchoolTasksIcon from '../../../assets/Images/Icons/SchoolTasksIcon.png';
import TodoButtonImage from '../../../assets/Images/todo.png';
import GoldenArrow from '../../../assets/Images/GoldenArrow.png';
import SpecialTaskIcon from '../../../assets/Images/Icons/SpecialTaskIcon.png';
import ActivityIcon from '../../../assets/Images/Icons/ActivityIcon.png';
const tasksCategories = [
  {
    title: 'Room',
    background: TodoButtonImage,
  },
  {
    title: 'Special',
    background: SpecialTaskIcon,
  },
  {
    title: 'School',
    background: SchoolTasksIcon,
  },
  {
    title: 'Activities',
    background: ActivityIcon,
  },
];
// This Render the categories buttons and the category task based on the chosen category that saved in the text state
export const DisplayTasksCategories = () => {
  const [text, setText] = useState<string | undefined>();
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const dimensions = useDimensions();
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
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: smallScreen ? 150 : 200,
      marginLeft: 25,
    },
    categoryView: {
      minHeight: smallScreen ? 80 : 120,
      alignItems: 'center',
    },
    CategoryTitleBg: {
      width: smallScreen ? 120 : 180,
      height: smallScreen ? 71 : 107,
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
  });

  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        {tasksCategories.map(taskCategory => {
          return (
            <View key={taskCategory.title} style={styles.categoryView}>
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

                    <Text type="text">{taskCategory.title}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
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
            <Text type="header">Pleas Select a Category</Text>
          </ImageBackground>
        </View>
      )}
    </View>
  );
};
