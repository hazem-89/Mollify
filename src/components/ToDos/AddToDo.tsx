import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { TodoMenuHeader } from './TodoMenuSign';
import TodoBackGroundImage from '../../../assets/Images/TodoBackGroundImage.png';
import { Text } from '../../components/Text';
import { useDimensions } from '@react-native-community/hooks';
import { AddActivityTask } from '../ToDos/AddActivityTask';
import { AddCleaningToDo } from '../ToDos/AddCleaningToDo';
import { AddSchoolTask } from '../ToDos/AddSchoolTask';
import { AddSpacialTodo } from '../ToDos/AddSpacialTodo';
import FormModal from '../modals/FormModal';
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
    link: 'AddSchoolAssignment',
  },
  {
    title: 'Add Activity',
    link: 'AddActivityTask',
  },
];
export const AddToDo = () => {
  const [addTaskBtnClicked, setAddTaskBtnClicked] = useState<
    string | undefined
  >();
  const [component, setComponent] = useState<JSX.Element | undefined>();
  const [formText, setFormText] = useState<string | undefined>();

  function handleClick(state: string | undefined) {
    setAddTaskBtnClicked(state);
    switch (state) {
      case 'AddActivityTask':
        setComponent(<AddActivityTask />);
        setFormText('addTask');
        break;
      case 'AddCleaningTask':
        setComponent(<AddCleaningToDo />);
        setFormText('addTask');
        break;
      case 'AddSchoolAssignment':
        setComponent(<AddSchoolTask />);
        setFormText('addTask');
        break;
      case 'AddSpacialTask':
        setComponent(<AddSpacialTodo />);
        setFormText('addTask');
        break;
    }
  }

  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: smallScreen ? 380 : 530,
      minWidth: smallScreen ? 550 : 750,
      justifyContent: 'center',
      padding: 50,
    },
    TodoBackground: {
      width: smallScreen ? 200 : 300,
      height: smallScreen ? 30 : 50,
      flex: 1,
      padding: smallScreen ? 2 : 10,
      alignItems: 'center',
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
    <>
      {!addTaskBtnClicked ? (
        <>
          <View
            style={{
              position: 'absolute',
              top: smallScreen ? -10 : -15,
              left: '20%',
              zIndex: 100,
            }}
          >
            <TodoMenuHeader text="Add Task" />
          </View>
          <View style={styles.container}>
            {todoCategories?.map(todoCategory => (
              <TouchableOpacity
                key={todoCategory.title}
                onPress={() => {
                  handleClick(todoCategory.link);
                }}
                style={{ alignItems: 'center' }}
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
      <FormModal
        component={component}
        onEmit={() => handleClick(undefined)}
        text={formText}
      />
    </>
  );
};
