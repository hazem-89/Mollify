import { StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';
import Button from '../buttons/Buttons';
import { useTasks } from '../../util/context/TaskContext';
import { Text } from '../../components/Text';

const tasksCategories = [
  {
    title: 'Cleaning tasks',
    background: 'CleaningTasks',
  },
  {
    title: 'Special tasks',
    background: 'SpecialTasks',
  },
  {
    title: 'School assignments',
    background: 'SchoolTasks',
  },
  {
    title: 'Activities',
    background: 'Activities',
  },
];
export const DisplayTasksCategories = () => {
  const { getProfileTasks, profileTasks } = useTasks();
  const [chosenCategory, setChosenCategory] = useState<string>('');
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: smallScreen ? 380 : 530,
      minWidth: smallScreen ? 550 : 750,
      padding: smallScreen ? 40 : 50,
    },
    textView: {
      marginVertical: smallScreen ? 20 : 30,
    },
    categoriesContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    categoryView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: smallScreen ? 70 : 100,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <View style={styles.textView}>
          <Text type="header">Tasks</Text>
        </View>
        <View style={styles.categoriesContainer}>
          {tasksCategories.map(taskCategory => {
            return (
              <View key={taskCategory.title} style={styles.categoryView}>
                <Button
                  background={taskCategory.background}
                  onPress={() => {
                    console.log('component');
                    setChosenCategory(taskCategory.title);
                  }}
                />
                <Text type="text">{taskCategory.title}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
