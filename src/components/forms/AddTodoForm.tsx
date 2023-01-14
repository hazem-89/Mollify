import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';
import uuid from 'react-native-uuid';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TextInput } from '../CustomInput';
import colors from '../../constants/colors';
import Button from '../buttons/Buttons';
import laundryBasket from '../../../assets/images/Icons/basket.png';
import { Text } from '../../components/Text';
import hourglass from '../../../assets/images/Icons/hourglass.png';
import PointsIcon from '../../../assets/images/Icons/PointsIcon.png';
import TaskTextBg from '../../../assets/images/TaskTextBg.png';
import CleaningTasksBg from '../../../assets/images/CleaningTasksBg.png';
import ActiveCleaningTasksBg from '../../../assets/images/ActiveCleaningTasksBg.png';

import { useDataContext } from '../../util/context/DataContext';

const CleaningTodo = [
  {
    title: 'Dirty clothes',
    description: 'Put the dirty clothes in the laundry basket',
    img: laundryBasket,
    selected: false,
  },
  {
    title: 'Dirty Dishes',
    description: 'Take the dishes to the kitchen',
    img: laundryBasket,
    selected: false,
  },
  {
    title: 'Garbage',
    description: 'Put the dirty clothes in the laundry basket',
    img: laundryBasket,
    selected: false,
  },
  {
    title: 'Watering Plants',
    description: 'Not too much not too little water',
    img: laundryBasket,
    selected: false,
  },
];

type ErrorType = {
  taskTitle?: string;
  taskDescription?: string;
  points?: string;
  time?: string;
};

type todoFormProps = {
  category: string;
  setAddTaskBtnClicked: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

export const AddTodoForm = ({
  category,
  setAddTaskBtnClicked,
}: todoFormProps) => {
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    React.useState({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [endTime, setEndTime] = useState<Date>();
  const [pointsValue, setPointsValue] = useState('');
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const [state, setState] = useState({
    taskTitle: '',
    taskDescription: '',
    selected: '',
  });
  const { addDocToFS } = useDataContext();
  const test = () => {
    setAddTaskBtnClicked(undefined);
  };
  const styles = StyleSheet.create({
    container: {
      // maxWidth: smallScreen ? 580 : 700,
      minHeight: smallScreen ? 300 : 500,
      flexDirection: 'row',
      // alignItems: 'flex-end',
      // alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      justifyContent: 'center',
      maxHeight: 40,
      marginTop: smallScreen ? 20 : 30,
      borderBottomColor: colors.primary,
      borderBottomWidth: 1,
      width: smallScreen ? 250 : 350,
      alignItems: 'flex-start',
    },
    PointsInput: {
      width: smallScreen ? 80 : 100,
    },
    inputContainer: {
      alignItems: 'center',
      marginTop: 40,
    },
    TimePointsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: smallScreen ? 0 : 20,
      // maxWidth: 300,
      // width: smallScreen ? 580 : 700,
    },
    TimePointView: {
      width: smallScreen ? 150 : 200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    TasksContainer: {
      width: smallScreen ? 120 : 140,
      height: smallScreen ? 95 : 110,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: '#FF7A00',
      borderRadius: 500,
      marginLeft: 20,
      marginBottom: 10,
    },
    icons: {
      width: smallScreen ? 25 : 40,
      height: smallScreen ? 40 : 70,
      marginRight: 10,
    },
    CleaningTasksInfo: {
      // maxHeight: 100,
      maxWidth: smallScreen ? 150 : 200,
      position: 'absolute',
      left: smallScreen ? -270 : -280,
      top: smallScreen ? 110 : 140,
    },
    OtherTasksInfo: {
      // maxHeight: 100,
      maxWidth: smallScreen ? 150 : 200,
      position: 'absolute',
      left: smallScreen ? -300 : -350,
      top: smallScreen ? 60 : 140,
    },
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn('A date has been picked: ', date);
    setEndTime(date);
    hideDatePicker();
  };

  const submit = () => {
    const nextErrors: ErrorType = {};
    if (!state.taskTitle) {
      nextErrors.taskTitle = 'This field is required.';
    }
    if (!state.taskDescription) {
      nextErrors.taskDescription = 'This field is required.';
    }
    if (!pointsValue) nextErrors.points = 'you need to set points';
    if (!endTime) nextErrors.time = 'you need to set Time';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log('no err');
      const newTodo = {
        id: uuid.v4(),
        taskTitle: state.taskTitle,
        taskDescription: state.taskDescription,
        pointsValue,
        endTime: endTime?.toString(),
        category,
        isDone: false,
        hasRequest: false,
        // need to replace profile with the current profile.id
        profileId: 'Lgq9YJnPLLezb1iE4xHQ',
      };
      addDocToFS('Tasks', newTodo);
      Alert.alert(
        'Success!',
        `Title: ${state.taskTitle} \n Description: ${state.taskDescription}`,
      );
    }
    setEndTime(new Date());
    setPointsValue('');
    if (Object.keys(nextErrors).length > 0) {
      return null;
    }
    return null;
  };

  function handlePress(todo: { description: string; title: string }) {
    if (
      state.taskDescription &&
      state.taskDescription === todo.description &&
      state.taskTitle &&
      state.taskTitle === todo.title &&
      state.selected === todo.title
    ) {
      setState({
        ...state,
        taskDescription: '',
        selected: '',
        taskTitle: '',
      });
    } else {
      setState({
        ...state,
        taskDescription: todo.description,
        selected: todo.title,
        taskTitle: todo.title,
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        {category === 'Room' && (
          <>
            <View style={styles.CleaningTasksInfo}>
              <Text type="MenuTitle">
                Here you can Add a room cleaning task
              </Text>
              {/* <Text type="MenuTitle">
                Adding a task will automatically add an item to the room
              </Text> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: smallScreen ? 300 : 500,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: smallScreen ? 20 : 30,
              }}
            >
              {CleaningTodo?.map(todo => {
                return (
                  <View
                    key={todo.title}
                    style={{
                      minWidth: smallScreen ? 100 : 120,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TouchableOpacity onPress={() => handlePress(todo)}>
                      <ImageBackground
                        style={styles.TasksContainer}
                        source={
                          todo.title !== state.selected
                            ? CleaningTasksBg
                            : ActiveCleaningTasksBg
                        }
                      >
                        <Image
                          source={todo.img}
                          style={{
                            width: smallScreen ? 50 : 50,
                            resizeMode: 'stretch',
                          }}
                        />
                        <Text type="text">{todo.title}</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            {state.taskDescription && (
              <ImageBackground
                source={TaskTextBg}
                style={{
                  marginVertical: smallScreen ? 10 : 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: smallScreen ? 300 : 400,
                  height: smallScreen ? 60 : 80,
                }}
              >
                <Text type="text">{state.taskDescription}</Text>
              </ImageBackground>
            )}
          </>
        )}

        {category !== 'Room' && (
          <View style={styles.inputContainer}>
            <View style={styles.OtherTasksInfo}>
              <Text type="MenuTitle">Here you can Add a {category} task</Text>
            </View>
            <TextInput
              placeholder="Task title:"
              value={state.taskTitle}
              onChangeText={(text: string) =>
                setState({ ...state, taskTitle: text })
              }
              errorText={errors.taskTitle}
              keyboardType="default"
              autoCapitalize="none"
              impStyle={styles.input}
            />
            <TextInput
              placeholder="Task description:"
              value={state.taskDescription}
              onChangeText={(text: string) =>
                setState({ ...state, taskDescription: text })
              }
              errorText={errors.taskDescription}
              keyboardType="default"
              autoCapitalize="none"
              multiline={true}
              impStyle={styles.input}
            />
          </View>
        )}
        <View style={styles.TimePointsContainer}>
          <View style={styles.TimePointView}>
            <TouchableOpacity
              disabled={!state.taskTitle && !state.taskDescription}
              onPress={showDatePicker}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Image source={hourglass} style={styles.icons} />
              <Text type={endTime ? 'DigitalNum' : 'text'}>
                {endTime ? endTime.toISOString().slice(0, 10) : 'Select Time'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              minimumDate={new Date()}
              minuteInterval={10}
            />

            <Text type="errorText">{errors.time}</Text>
          </View>

          <View style={styles.TimePointView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={PointsIcon} style={styles.icons} />
              <TextInput
                placeholder="Set task Points"
                autoCapitalize="none"
                value={pointsValue}
                keyboardType="number-pad"
                onChangeText={changedPin => setPointsValue(changedPin)}
                impStyle={styles.PointsInput}
              />
            </View>
            <Text type="errorText">{errors.points}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            minWidth: smallScreen ? 350 : 450,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button background="GreenForms" text="Add" onPress={() => submit()} />
          <Button background="Cancel" text="Cancel" onPress={() => test()} />
        </View>
      </View>
    </View>
  );
};
