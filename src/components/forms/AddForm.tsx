import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';
// Uninstall
// import uuid from 'react-native-uuid';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TextInput } from '../CustomInput';
import Button from '../buttons/Buttons';
import laundryBasket from '../../../assets/images/Icons/basket.png';
import { Text } from '../Text';
import hourglass from '../../../assets/images/Icons/hourglass.png';
import PointsIcon from '../../../assets/images/Icons/PointsIcon.png';
import TaskTextBg from '../../../assets/images/TaskTextBg.png';
import CleaningTasksBg from '../../../assets/images/CleaningTasksBg.png';
import ActiveCleaningTasksBg from '../../../assets/images/ActiveCleaningTasksBg.png';
import InputBg from '../../../assets/images/InputBg.png';
import { Rewards, Tasks } from '../../Interfaces';
import { useDataContext } from '../../util/context/DataContext';
import { useNavigation } from '@react-navigation/native';

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
    description: 'You need to water your plants',
    img: laundryBasket,
    selected: false,
  },
];

type ErrorType = {
  taskDescription?: string;
  points?: string;
  time?: string;
};

type todoFormProps = {
  category?: string;
  setAddTaskBtnClicked?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  ParentComponent: string;
  setAddRewardBtnClicked?: React.Dispatch<React.SetStateAction<boolean>>;
  reward?: Rewards;
  task?: Tasks;
};

export const AddTodoForm = ({
  category,
  setAddTaskBtnClicked,
  ParentComponent,
  setAddRewardBtnClicked,
  reward,
  task,
}: todoFormProps) => {
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    React.useState({});
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [endTime, setEndTime] = useState<Date>();
  const [pointsValue, setPointsValue] = useState('');
  const [descriptionInputExample, setDescriptionInputExample] = useState('');
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const {
    selectedChild,
    addDocToFS,
    updateFSDoc,
    setTasks,
    setRewards,
    retrieveFSData,
  } = useDataContext();

  const [state, setState] = useState<{
    title: string;
    description: string;
    selected: string;
  }>({
    title: '',
    description: '',
    selected: '',
  });
  const closeAdd = () => {
    if (setAddTaskBtnClicked) {
      setAddTaskBtnClicked(undefined);
    }
    if (setAddRewardBtnClicked) {
      setAddRewardBtnClicked(false);
    }
  };
  useEffect(() => {
    switch (category) {
      case 'Special':
        setDescriptionInputExample(
          'Enter a task: E.g. Baby site your baby brother for 20 min',
        );
        break;
      case 'School':
        setDescriptionInputExample(
          'Enter a task: E.g. Practice multiplication for 1 hour',
        );
        break;
      case 'Activities':
        setDescriptionInputExample(
          'Enter a task: E.g. Practice dancing 1 hour',
        );
        break;
      case 'AddReward':
        setDescriptionInputExample('Enter a Reward:');
        break;
      case 'EditReward':
        if (reward) {
          setState({
            ...state,
            description: reward.title,
          });
          let rewardTime = reward?.endTime.slice(0, 16);
          setEndTime(new Date(rewardTime));
          setDescriptionInputExample(reward.title);
          setPointsValue(reward.points);
        }
        break;
      case 'EditTask':
        if (task) {
          setState({
            ...state,
            description: task.taskDescription,
          });
          let taskTime = task?.endTime.slice(0, 16);
          setEndTime(new Date(taskTime));
          setDescriptionInputExample(task.taskDescription);
          setPointsValue(task.pointsValue);
        }
        break;

      default:
        break;
    }
  }, []);

  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    container: {
      minHeight: smallScreen ? 300 : 500,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    input: {
      width: smallScreen ? 300 : 400,
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
      marginVertical: smallScreen ? 15 : 30,
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
      borderRadius: 500,
      marginLeft: 20,
    },
    icons: {
      width: smallScreen ? 40 : 55,
      minHeight: smallScreen ? 80 : 90,
      maxHeight: smallScreen ? 65 : 120,
      marginRight: 10,
    },
    CleaningTasksInfo: {
      maxWidth: smallScreen ? 150 : 200,
      position: 'absolute',
      left: smallScreen ? -220 : -280,
      top: smallScreen ? 110 : 140,
    },
    OtherTasksInfo: {
      maxWidth: smallScreen ? 150 : 200,
      position: 'absolute',
      left: smallScreen ? -250 : -280,
      top: smallScreen ? 60 : 110,
    },
    InputBg: {
      width: smallScreen ? 350 : 500,
      height: smallScreen ? 65 : 90,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorsView: {
      backgroundColor: 'rgba(255, 255, 255, .8)',
      width: 0.15 * ScreenWidth,
      padding: 5,
      alignItems: 'center',
      borderRadius: 10,
      marginBottom: 0.02 * ScreenHeight,
    },
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setEndTime(date);
    hideDatePicker();
  };

  const submit = () => {
    const nextErrors: ErrorType = {};
    if (!state.description) {
      nextErrors.taskDescription = 'This field is required.';
    }
    if (!pointsValue) nextErrors.points = 'you need to set points';
    if (!endTime) nextErrors.time = 'you need to set Time';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      if (ParentComponent === 'Tasks' && category !== 'EditTask') {
        const newTodo = {
          taskTitle: state.title,
          taskDescription: state.description,
          pointsValue,
          endTime: endTime?.toString(),
          category,
          isDone: false,
          hasRequest: false,
          profileId: selectedChild.id,
        };
        addDocToFS('Tasks', newTodo);
        setPointsValue('');
        Alert.alert('update task Success!');
        closeAdd();
        retrieveFSData('Tasks', 'profileId', `${selectedChild.id}`).then(
          (data: any) => {
            if (data) setTasks(data);
          },
        );
      }
      if (ParentComponent === 'Tasks' && category === 'EditTask') {
        const updatedTodo = {
          taskTitle: state.title,
          taskDescription: state.description,
          pointsValue,
          endTime: endTime?.toString(),
        };
        updateFSDoc('Tasks', task?.id, updatedTodo);
        setPointsValue('');
        Alert.alert('update task Success!');
        closeAdd();
        retrieveFSData('Tasks', 'profileId', `${selectedChild.id}`).then(
          (data: any) => {
            if (data) setTasks(data);
          },
        );
      }
      if (ParentComponent === 'Reward' && category === 'AddReward') {
        const newReward = {
          title: state.description,
          points: pointsValue,
          endTime: endTime?.toString(),
          profileId: selectedChild.id,
          isDone: false,
        };
        addDocToFS('Rewards', newReward);
        setPointsValue('');
        Alert.alert('Add Success!');
        closeAdd();
        retrieveFSData('Rewards', 'profileId', `${selectedChild.id}`).then(
          (data: any) => {
            if (data) setRewards(data);
          },
        );
      }
      if (ParentComponent === 'Reward' && category === 'EditReward') {
        const updatedReward = {
          title: state.description,
          points: pointsValue,
          endTime: endTime?.toString(),
          profileId: selectedChild.id,
          isDone: reward?.isDone,
        };
        updateFSDoc('Rewards', reward?.id, updatedReward);
        setPointsValue('');
        Alert.alert('update Success!');
        closeAdd();
        retrieveFSData('Rewards', 'profileId', `${selectedChild.id}`).then(
          (data: any) => {
            if (data) setRewards(data);
          },
        );
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      return null;
    }
    return null;
  };

  function handlePress(todo: { description: string; title: string }) {
    if (
      state.description &&
      state.description === todo.description &&
      state.selected === todo.title
    ) {
      setState({
        ...state,
        description: '',
        selected: '',
      });
    } else {
      setState({
        ...state,
        description: todo.description,
        selected: todo.title,
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        {category === 'Room' && (
          <>
            <View style={styles.CleaningTasksInfo}>
              <Text type="MenuTitle">Here you can add a cleaning task</Text>
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
            {state.description && (
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
                <Text type="text">{state.description}</Text>
              </ImageBackground>
            )}
          </>
        )}

        {category !== 'Room' && (
          <View style={styles.inputContainer}>
            {ParentComponent !== 'Reward' && (
              <View style={styles.OtherTasksInfo}>
                <Text type="MenuTitle">Here you can Add a {category} task</Text>
              </View>
            )}
            <ImageBackground source={InputBg} style={styles.InputBg}>
              <TextInput
                placeholder={descriptionInputExample}
                value={state.description}
                onChangeText={(text: string) =>
                  setState({ ...state, description: text })
                }
                errorText={errors.taskDescription}
                keyboardType="default"
                autoCapitalize="none"
                multiline={true}
                impStyle={styles.input}
              />
            </ImageBackground>
          </View>
        )}
        <View style={styles.TimePointsContainer}>
          <View style={styles.TimePointView}>
            <TouchableOpacity
              disabled={!state.description}
              onPress={showDatePicker}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Image source={hourglass} style={styles.icons} />
              <View style={{ marginBottom: 10 }}>
                <Text type={endTime ? 'DigitalNum' : 'text'}>
                  {endTime ? endTime.toISOString().slice(0, 10) : 'Select Time'}
                </Text>
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              minimumDate={new Date()}
              minuteInterval={10}
            />
            {errors.time && (
              <View style={styles.errorsView}>
                <Text type="errorText">{errors.time}</Text>
              </View>
            )}
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
            {errors.points && (
              <View style={styles.errorsView}>
                <Text type="errorText">{errors.points}</Text>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            minWidth: smallScreen ? 350 : 450,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: category === 'Room' ? -15 : 10,
          }}
        >
          <Button background="GreenForms" text="Add" onPress={() => submit()} />
          <Button
            background="Cancel"
            text="Cancel"
            onPress={() => closeAdd()}
          />
        </View>
      </View>
    </View>
  );
};
