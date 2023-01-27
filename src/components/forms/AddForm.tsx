import { useDimensions } from '@react-native-community/hooks';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
// Uninstall
// import uuid from 'react-native-uuid';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-root-toast';
import ActiveCleaningTasksBg from '../../../assets/images/ActiveCleaningTasksBg.png';
import CleaningTasksBg from '../../../assets/images/CleaningTasksBg.png';
import hourglass from '../../../assets/images/Icons/hourglass.png';
import PointsIcon from '../../../assets/images/Icons/PointsIcon.png';
import InputBg from '../../../assets/images/InputBg.png';
import garbageBin from '../../../assets/images/roomObjects/disposal/garbageBin.png';
import plant from '../../../assets/images/roomObjects/disposal/plant.png';
import washSponge from '../../../assets/images/roomObjects/disposal/washSponge.png';
import dirtyLaundry from '../../../assets/images/roomObjects/draggable/dirtyLaundry.png';
import TaskTextBg from '../../../assets/images/TaskTextBg.png';
import broom from '../../../assets/images/roomObjects/draggable/broom.png';
import { Rewards, Tasks } from '../../Interfaces';
import { useDataContext } from '../../util/context/DataContext';
import Button from '../buttons/Buttons';
import { TextInput } from '../CustomInput';
import { Text } from '../Text';

const cleaningTodo = [
  {
    title: 'Laundry',
    description: 'Deal with your laundry',
    img: dirtyLaundry,
    selected: false,
  },
  {
    title: 'Dishes',
    description: 'Deal with your dishes',
    img: washSponge,
    selected: false,
  },
  {
    title: 'Garbage',
    description: 'Take out your garbage',
    img: garbageBin,
    selected: false,
  },
  {
    title: 'Watering Plants',
    description: 'Water the poor plants',
    img: plant,
    selected: false,
  },
  {
    title: 'Vacuum',
    description: 'Get those dust bunnies',
    img: broom,
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
          'Enter a task: E.g. Babysit your baby brother for 20 min',
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
          const rewardTime = reward?.endTime.slice(0, 16);
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
          const taskTime = task?.endTime.slice(0, 16);
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
      minHeight: 0.7 * ScreenHeight,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    input: {
      width: 0.4 * ScreenWidth,
    },
    PointsInput: {
      width: 0.1 * ScreenWidth,
    },
    inputContainer: {
      alignItems: 'center',
      marginTop: 0.08 * ScreenHeight,
    },
    TimePointsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 0.05 * ScreenHeight,
    },
    TimePointView: {
      width: 0.25 * ScreenWidth,
      alignItems: 'center',
      justifyContent: 'center',
    },
    TasksContainer: {
      width: 0.18 * ScreenWidth,
      height: smallScreen ? 0.3 * ScreenHeight : 0.25 * ScreenHeight,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 0.02 * ScreenWidth,
    },
    icons: {
      width: 0.05 * ScreenWidth,
      height: 0.17 * ScreenHeight,
      marginRight: 10,
    },
    CleaningTasksInfo: {
      maxWidth: 0.2 * ScreenWidth,
      position: 'absolute',
      left: -0.21 * ScreenWidth,
      top: 0.25 * ScreenHeight,
    },
    OtherTasksInfo: {
      maxWidth: 0.2 * ScreenWidth,
      position: 'absolute',
      left: -0.32 * ScreenWidth,
      top: 0.15 * ScreenHeight,
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
    taskDescription: {
      marginVertical: smallScreen ? 10 : 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: smallScreen ? 300 : 400,
      height: smallScreen ? 60 : 80,
    },
  });

  const handleConfirm = (date: Date) => {
    setEndTime(date);
    setDatePickerVisibility(false);
  };

  const submit = () => {
    const nextErrors: ErrorType = {};
    if (!state.description) {
      nextErrors.taskDescription = 'This field is required.';
    }
    if (!pointsValue) nextErrors.points = 'You need to set points';
    if (!endTime) nextErrors.time = 'You need to set a time for completion';
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
        Toast.show('  Task added successfully.  ', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
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
        Toast.show('  Task is Updated.  ', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
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
          ProfilePoints: selectedChild.points,
        };
        addDocToFS('Rewards', newReward);
        setPointsValue('');
        Toast.show('  Reward Added Successfully.  ', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
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
        Toast.show('  Reward updated Successfully.  ', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
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
              <Text type="MenuTitle">Here you can add a room task</Text>
              {/* <Text type="MenuTitle">
                Adding a task will automatically add an item to the room
              </Text> */}
            </View>
            <ScrollView
              horizontal={true}
            // style={{ width: 0.3 * ScreenWidth }}
            />
            <ScrollView
              horizontal={true}
              style={{
                flexDirection: 'row',
                width: 0.7 * ScreenWidth,
                // alignItems: 'center',
                // justifyContent: 'center',
                // marginTop: smallScreen ? 20 : 0,
              }}
            >
              {cleaningTodo?.map(todo => {
                return (
                  <View
                    key={todo.title}
                    style={{
                      minWidth: smallScreen ? 100 : 120,
                      // alignItems: 'center',
                      // justifyContent: 'center',
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
                          resizeMode="contain"
                          source={todo.img}
                          style={{
                            width: smallScreen ? 50 : 50,
                            height: 50,
                            resizeMode: 'stretch',
                          }}
                        />
                        <Text type="text">{todo.title}</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
            {state.description && (
              <ImageBackground
                source={TaskTextBg}
                style={styles.taskDescription}
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
                <Text type="MenuTitle">Here you can add a {category} task</Text>
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
              onPress={() => setDatePickerVisibility(true)}
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
              onCancel={() => setDatePickerVisibility(false)}
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
            minWidth: 0.45 * ScreenWidth,
            justifyContent: 'space-between',
            alignItems: 'center',
            // marginTop: category === 'Room' ? -15 : 10,
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
