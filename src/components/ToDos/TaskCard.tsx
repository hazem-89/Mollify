import React, { ReactElement, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Image,
} from 'react-native';
import { Tasks } from '../../Interfaces';
import PointsBackground from '../../../assets/Images/Icons/PointsBackground.png';
import { useDimensions } from '@react-native-community/hooks';
import colors from '../../constants/colors';
import { Text } from '../../components/Text';
import { CountdownTimer } from './CountDown';
import { Swipeable } from 'react-native-gesture-handler';
import Button from '../buttons/Buttons';
import { useTasks } from '../../util/context/TaskContext';
import { Confirm } from './Confirm';
import FormModal from '../modals/FormModal';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
interface Props {
  task: Tasks;
}

const TaskCard = ({ task }: Props) => {
  const { getTasks } = useTasks();
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const [parent, setParent] = useState(true);
  const [swipeOn, setSwipeOn] = useState(false);
  const [component, setComponent] = useState<ReactElement | undefined>();
  const [btnClicked, setBtnClicked] = useState<string | undefined>();
  const [taskRequestStatus, setTaskRequestStatus] = useState(task.hasRequest);
  let updateAcceptedReq = {};
  const handleTaskRequestStatus = async (status: boolean, funName: string) => {
    if (funName === 'updateRequest') {
      updateAcceptedReq = {
        ...task,
        hasRequest: status,
      };
    } else if (funName === 'updateTaskDone') {
      updateAcceptedReq = {
        ...task,
        isDone: status,
        hasRequest: false,
      };
    }

    if (task.id) {
      try {
        await setDoc(doc(db, 'Tasks', task?.id), updateAcceptedReq);
        setTaskRequestStatus(status);
        getTasks();
      } catch (err) {
        console.log(err);
      }
    }
  };
  const UpdateTaskStatus = (funName: string) => {
    handleTaskRequestStatus(true, funName);
  };
  const markTaskDone = (funName: string) => {
    handleTaskRequestStatus(true, funName);
  };
  function handleClick(state: string | undefined) {
    setBtnClicked(state);
    switch (state) {
      case 'confirm':
        setComponent(
          <Confirm
            text="Are You Sure"
            taskId={task.id}
            confirmBtnText="Delete"
            funName="delete"
          />,
        );
        break;
      case 'TaskNotification':
        setComponent(
          <Confirm
            text="Mark as Done?"
            taskId={task.id}
            confirmBtnText="Confirm"
            funName="updateTaskDone"
            markTaskDone={() => markTaskDone('updateTaskDone')}
          />,
        );
        break;
      default:
        setComponent(undefined);
    }
  }
  const endDate = new Date(task.endTime);

  const styles = StyleSheet.create({
    CardContainer: {
      marginTop: 10,
      maxHeight: smallScreen ? 50 : 75,
      paddingHorizontal: 20,
    },
    TextView: {
      flex: 1,
      maxWidth: smallScreen ? 250 : 400,
      height: 50,
      justifyContent: 'center',
    },
    taskView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: colors.primary,
    },
    TimeBackground: {
      width: smallScreen ? 75 : 100,
      height: smallScreen ? 40 : 50,
    },
    PointsBackground: {
      width: smallScreen ? 40 : 60,
      height: smallScreen ? 40 : 60,
    },
    icons: {
      width: smallScreen ? 40 : 50,
      height: smallScreen ? 40 : 50,
    },
  });
  const leftSwipe = (
    progress: any,
    dragX: {
      interpolate: (arg0: {
        inputRange: number[];
        outputRange: number[];
        extrapolate: string;
      }) => any;
    },
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={{ flexDirection: 'row', minWidth: parent ? 100 : 50 }}>
        {parent ? (
          <>
            <Button
              background="DeleteTask"
              onPress={() => handleClick('confirm')}
            />
            <TouchableOpacity
              style={{
                width: smallScreen ? 30 : 50,
                height: smallScreen ? 30 : 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Animated.Text style={{ transform: [{ scale: scale }] }}>
                Edit
              </Animated.Text>
            </TouchableOpacity>
          </>
        ) : (
          <View>
            <Button
              background="DoneIcon"
              onPress={() => UpdateTaskStatus('updateRequest')}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.CardContainer}>
      {task.hasRequest && parent && !swipeOn && !btnClicked && (
        <View
          style={{
            position: 'absolute',
            zIndex: 9999,
            top: -15,
            left: 0,
          }}
        >
          <Button
            background="TaskNotification"
            onPress={() => handleClick('TaskNotification')}
          />
        </View>
      )}
      {!btnClicked ? (
        <TouchableOpacity activeOpacity={0.6}>
          <Swipeable
            renderLeftActions={leftSwipe}
            onBegan={() => setSwipeOn(true)}
            onSwipeableClose={() => setSwipeOn(false)}
          >
            <View style={styles.taskView}>
              <View style={styles.TextView}>
                <Text type="todoList">{task.taskDescription}</Text>
                {/* <Text type="todoList">{date}</Text> */}
              </View>
              <ImageBackground
                source={PointsBackground}
                style={styles.PointsBackground}
              >
                <View
                  style={{
                    width: smallScreen ? 40 : 60,
                    height: smallScreen ? 40 : 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text type="todoList">{task.pointsValue}</Text>
                </View>
              </ImageBackground>
              <View
                style={{
                  width: smallScreen ? 90 : 100,
                  height: smallScreen ? 40 : 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CountdownTimer date={endDate} />
              </View>
            </View>
          </Swipeable>
        </TouchableOpacity>
      ) : (
        <View style={{ position: 'absolute', top: -100, left: '50%' }}>
          <FormModal
            component={component}
            onEmit={() => handleClick(undefined)}
            text="confirm"
          />
        </View>
      )}
    </View>
  );
};

export default TaskCard;
