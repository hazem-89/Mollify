import { StyleSheet, View, Image } from 'react-native';
import React, { ReactElement, useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';
import Button from '../buttons/Buttons';
import { useTasks } from '../../util/Context/TaskContext';
import { Text } from '../../components/Text';
import FormModal from '../modals/FormModal';
import { TasksCategoryPage } from './TasksCategoryPage';

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
  const [component, setComponent] = useState<ReactElement | undefined>();
  const [text, setText] = useState<string | undefined>();
  const [btnClicked, setAddTaskBtnClicked] = useState<string | undefined>();

  function handleClick(state: string | undefined, category?: string) {
    setAddTaskBtnClicked(state);
    if (category) {
      switch (state) {
        case 'category':
          setComponent(<TasksCategoryPage category={category} />);
          break;
        default:
          setComponent(undefined);
      }
    }
  }
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
                    handleClick('category', taskCategory.title);
                  }}
                />
                <Text type="text">{taskCategory.title}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <FormModal
        component={component}
        onEmit={() => handleClick(undefined)}
        text={text}
      />
    </View>
  );
};
