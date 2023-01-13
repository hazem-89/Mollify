import { Alert, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';
import uuid from 'react-native-uuid';
import { TextInput } from '../CustomInput';
import colors from '../../constants/colors';
import Button from '../buttons/Buttons';
import laundryBasket from '../../../assets/images/Icons/basket.png';
import { Text } from '../../components/Text';
import hourglass from '../../../assets/images/Icons/hourglass.png';
import PointsIcon from '../../../assets/images/Icons/PointsIcon.png';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTasks } from '../../util/context/AddtoDBContext';

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
};

export const AddTodoForm = ({ category }: todoFormProps) => {
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
  const { addCleaningTask } = useTasks();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: smallScreen ? 380 : 400,
      maxWidth: smallScreen ? 550 : 300,
      padding: smallScreen ? 40 : 50,
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
    inputContainer: {
      alignItems: 'center',
      marginTop: 40,
    },
    TimePointsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    },
    TimePointView: {
      width: smallScreen ? 150 : 200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    AvatarContainer: {
      width: smallScreen ? 50 : 100,
      height: smallScreen ? 50 : 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF7A00',
      borderRadius: 500,
      marginLeft: 5,
    },
    AvatarContainerSelected: {
      width: smallScreen ? 50 : 100,
      height: smallScreen ? 50 : 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'green',
      marginRight: 10,
      borderRadius: 500,
    },
    icons: {
      width: smallScreen ? 25 : 40,
      height: smallScreen ? 40 : 70,
      marginRight: 10,
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
        //need to replace profile with the current profile.id
        profileId: 'Lgq9YJnPLLezb1iE4xHQ',
      };
      addCleaningTask(newTodo);
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
    <View>
      {category === 'Cleaning tasks' && (
        <>
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
                <TouchableOpacity
                  key={todo.title}
                  onPress={() => handlePress(todo)}
                >
                  <View
                    style={
                      todo.title !== state.selected
                        ? styles.AvatarContainer
                        : styles.AvatarContainerSelected
                    }
                  >
                    <Image
                      source={todo.img}
                      style={{
                        width: smallScreen ? 50 : 50,
                        resizeMode: 'stretch',
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ alignItems: 'center' }}>
            {state.taskTitle && (
              <View
                style={{
                  marginVertical: 10,
                  alignItems: 'flex-start', // marginLeft: 55,
                  width: smallScreen ? 250 : 350,
                }}
              >
                <Text type="text">{state.taskTitle}</Text>
              </View>
            )}
            {state.taskDescription && (
              <View
                style={{
                  marginBottom: 10,
                  alignItems: 'flex-start',
                  width: smallScreen ? 250 : 350,
                }}
              >
                <Text type="todoList">Description:</Text>
                <Text type="todoList">{state.taskDescription}</Text>
              </View>
            )}
          </View>
        </>
      )}

      {category !== 'Cleaning tasks' && (
        <View style={styles.inputContainer}>
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
            <Text type="text">Set Time</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            style={{
              shadowColor: '#fff',
              shadowRadius: 0,
              shadowOpacity: 1,
              shadowOffset: { height: 0, width: 0 },
            }}
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
            />
          </View>
          <Text type="errorText">{errors.points}</Text>
        </View>
      </View>
      <View style={{ marginBottom: smallScreen ? 10 : 0 }}>
        <Button background="GreenForms" text="Add" onPress={() => submit()} />
      </View>
    </View>
  );
};

