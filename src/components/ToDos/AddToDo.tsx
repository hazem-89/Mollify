import { useDimensions } from '@react-native-community/hooks';
import React, { ReactElement, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TodoBackGroundImage from '../../../assets/Images/TodoBackGroundImage.png';
import { Text } from '../../components/Text';
import { AddTodoForm } from '../forms/AddTodoForm';
import { TodoMenuHeader } from './TodoMenuSign';

const todoCategories = [
  {
    title: 'Add cleaning Task',
    link: 'AddCleaningTask',
  },
  {
    title: 'Add special task',
    link: 'AddSpecialTask',
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
  const [selectedForm, setSelectedForm] = useState<ReactElement | undefined>();
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);

  function handleClick(state: string | undefined) {
    setAddTaskBtnClicked(state);
    switch (state) {
      case 'AddActivityTask':
        setSelectedForm(<AddTodoForm category="Add activity" />);
        break;
      case 'AddCleaningTask':
        setSelectedForm(<AddTodoForm category="Add cleaning task" />);
        break;
      case 'AddSchoolAssignment':
        setSelectedForm(<AddTodoForm category="Add school assignment" />);
        break;
      case 'AddSpecialTask':
        setSelectedForm(<AddTodoForm category="Add special task" />);
        break;
      default:
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      padding: 50,
      marginTop: 20,
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
      <View style={styles.container}>
        {/* menuheader should probably be in FormModal */}
        <TodoMenuHeader text="Add Task" />
        {!addTaskBtnClicked ? (
          <>
            {todoCategories?.map(todoCategory => (
              /* Shouldn't this be a button? */
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
          </>
        ) : (
          selectedForm
        )}
      </View>
    </>
  );
};
