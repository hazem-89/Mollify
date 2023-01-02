import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { TodoMenuHeader } from '../modals/TodoMenuSign';
import TodoBackGroundImage from '../../../assets/Images/TodoBackGroundImage.png';
import { Text } from '../../components/Text';
import { useDimensions } from '@react-native-community/hooks';
import TodoFormModel from '../modals/TodoFormModel';

const todoCategories = [
  {
    title: 'Add cleaning Task',
    link: 'AddCleaningTask',
  },
  {
    title: 'Add special task',
    link: 'AddSpacialTask',
  },
  {
    title: 'Add school assignment',
    link: 'AddCleaningTask',
  },
  {
    title: 'Add Activity',
    link: 'AddCleaningTask',
  },
];
export const AddToDo = () => {
  const [btnClicked, setBtnClicked] = useState<string | undefined>();
  console.log('====================================');
  console.log(btnClicked);
  console.log('====================================');
  const handleEmit = useCallback((value: undefined) => {
    setBtnClicked(value); // This function will be called by the child component to emit a prop
  }, []);

  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: smallScreen ? 50 : 70,
      marginTop: 30,
      minHeight: smallScreen ? 250 : 400,
    },
    TodoBackground: {
      width: smallScreen ? 200 : 300,
      height: smallScreen ? 30 : 50,
      flex: 1,
      padding: smallScreen ? 2 : 10,
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginBottom: 10,
    },
    todoView: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  });
  return (
    <View>
      {!btnClicked ? (
        <>
          <View
            style={{
              position: 'absolute',
              top: smallScreen ? -60 : -100,
              justifyContent: 'center',
              // left: '50%',
            }}
          >
            <TodoMenuHeader text="Add To-Do" />
          </View>
          <View style={styles.container}>
            {todoCategories?.map(todoCategory => (
              <TouchableOpacity
                key={todoCategory.title}
                onPress={() => {
                  setBtnClicked(todoCategory.link);
                }}
              >
                <ImageBackground
                  source={TodoBackGroundImage}
                  style={styles.TodoBackground}
                >
                  <View style={styles.todoView}>
                    <Text type="todoList">{todoCategory.title}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : null}
      <TodoFormModel onEmit={handleEmit} formName={btnClicked} />
    </View>
  );
};
