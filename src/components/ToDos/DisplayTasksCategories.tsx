import { StyleSheet, View, Image } from 'react-native';
import React, { ReactElement, useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';
import Button from '../buttons/Buttons';
import { useTasks } from '../../util/context/AddtoDBContext';
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
type DisplayTasksCategoriesProps = {
  onClose?: () => void;
};
export const DisplayTasksCategories = ({
  onClose,
}: DisplayTasksCategoriesProps) => {
  const [component, setComponent] = useState<ReactElement | undefined>();
  const [text, setText] = useState<string | undefined>();
  const [btnClicked, setAddTaskBtnClicked] = useState<string | undefined>();
  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };
  function handleClick(state: string | undefined, category?: string) {
    setAddTaskBtnClicked(state);
    if (category) {
      switch (state) {
        case 'category':
          setComponent(<TasksCategoryPage category={category} />);
          setText(category);
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
      minHeight: smallScreen ? 150 : 300,
      MaxHeight: smallScreen ? 150 : 300,
      MaxWidth: smallScreen ? 500 : 700,
      minWidth: smallScreen ? 500 : 700,
    },
    textView: {
      marginVertical: smallScreen ? 10 : 10,
    },
    categoriesContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginTop: smallScreen ? 0 : 40,
    },
    categoryView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: smallScreen ? 70 : 100,
      MaxWidth: smallScreen ? 30 : 50,
    },
  });

  return (
    <View style={styles.container}>
      {!btnClicked ? (
        <View style={{ marginTop: 30 }}>
          <View style={styles.categoriesContainer}>
            {tasksCategories.map(taskCategory => {
              return (
                <View key={taskCategory.title} style={styles.categoryView}>
                  <Button
                    background={taskCategory.background}
                    onPress={() => {
                      handleClick('category', taskCategory.title);
                    }}
                  />
                  <Text type="text">{taskCategory.title}</Text>
                </View>
              );
            })}
          </View>
          <View style={{ marginTop: 40 }}>
            <Button
              background="Cancel"
              onPress={() => handleCancel()}
              text="Cancel"
            />
          </View>
        </View>
      ) : (
        <FormModal
          component={component}
          onEmit={() => handleClick(undefined)}
          text={text}
        />
      )}
    </View>
  );
};

