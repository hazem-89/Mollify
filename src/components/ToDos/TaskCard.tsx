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
import { useDimensions } from '@react-native-community/hooks';
import { Text } from '../../components/Text';
import { CountdownTimer } from './CountDown';
import { Swipeable } from 'react-native-gesture-handler';
import Button from '../buttons/Buttons';
import { useTasks } from '../../util/context/AddtoDBContext';
import { Confirm } from './Confirm';
import FormModal from '../modals/FormModal';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
// Images
import TaskTextBg from '../../../assets/images/TaskTextBg.png';
import TaskInReviewTextBg from '../../../assets/images/TaskInReviewTextBg.png';
import CountDownBg from '../../../assets/images/CountDownStoneBg.png';
import CountDownRedBg from '../../../assets/images/CountDownRedBg.png';
import CountDownGreenBg from '../../../assets/images/CountDownGreenBg.png';
import PointsBg from '../../../assets/images/PointsBg.png';
import PointsGreenBg from '../../../assets/images/PointsGreenBg.png';
import TaskInReviewNotifChilled from '../../../assets/images/Icons/TaskInReviewNotifChilled.png';
interface Props {
  task: Tasks;
}

const TaskCard = ({ task }: Props) => {
  const { getTasks } = useTasks();
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const [parent, setParent] = useState(false);
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
      case 'updateRequest':
        setComponent(
          <Confirm
            text="Are you done with this task?"
            taskId={task.id}
            confirmBtnText="Yes"
            funName="updateRequest"
            UpdateReqStatus={() => UpdateTaskStatus('updateRequest')}
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
      marginTop: 20,
      maxHeight: smallScreen ? 60 : 100,
      maxWidth: 800,
    },
    TextView: {
      flex: 1,
      maxWidth: smallScreen ? 300 : 400,
      height: smallScreen ? 60 : 80,
      justifyContent: 'center',
    },
    TextViewBg: {
      height: smallScreen ? 60 : 80,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    taskView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    CountDownView: {
      width: smallScreen ? 110 : 140,
      height: smallScreen ? 70 : 80,
      alignItems: 'center',
      padding: 5,
    },
    PointsBackground: {
      width: smallScreen ? 60 : 75,
      height: smallScreen ? 60 : 78,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icons: {
      width: smallScreen ? 40 : 50,
      height: smallScreen ? 40 : 50,
    },
    ParentButtonView: {
      minWidth: smallScreen ? 40 : 100,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
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
      <View
        style={{
          flexDirection: 'row',
          minWidth: 50,
          backgroundColor: 'rgba(144, 47, 5, 0.8)',
          padding: 10,
          borderRadius: 25,
        }}
      >
        {parent ? (
          <View style={styles.ParentButtonView}>
            <Button
              background="DeleteTask"
              onPress={() => handleClick('confirm')}
            />
            <Button
              background="DoneIcon"
              onPress={() => {
                console.log('====================================');
                console.log('parent edit');
                console.log('====================================');
              }}
            />
          </View>
        ) : (
          <View>
            <Button
              background="DoneIcon"
              onPress={() => handleClick('updateRequest')}
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
            top: -20,
            left: smallScreen ? 280 : 370,
          }}
        >
          <Button
            background="TaskNotification"
            onPress={() => handleClick('TaskNotification')}
          />
        </View>
      )}
      {task.hasRequest && !parent && !swipeOn && !btnClicked && (
        <View
          style={{
            position: 'absolute',
            zIndex: 9999,
            top: -20,
            left: smallScreen ? 280 : 370,
          }}
        >
          <Image
            source={TaskInReviewNotifChilled}
            style={{ width: 50, height: 50 }}
          ></Image>
        </View>
      )}

      <TouchableOpacity
        onPress={() =>
          !parent && !task.hasRequest ? handleClick('updateRequest') : null
        }
        activeOpacity={0.6}
      >
        <Swipeable
          renderLeftActions={leftSwipe}
          onBegan={() => setSwipeOn(true)}
          onSwipeableClose={() => setSwipeOn(false)}
        >
          <View style={styles.taskView}>
            <View style={styles.TextView}>
              <ImageBackground
                source={task.hasRequest ? TaskInReviewTextBg : TaskTextBg}
                style={styles.TextViewBg}
              >
                <Text type="text">{task.taskDescription}</Text>
              </ImageBackground>
            </View>
            <ImageBackground
              source={task.hasRequest ? PointsGreenBg : PointsBg}
              style={styles.PointsBackground}
            >
              <Text type="DigitalNum">{task.pointsValue}</Text>
            </ImageBackground>
            <ImageBackground
              source={task.hasRequest ? CountDownGreenBg : CountDownBg}
              style={styles.CountDownView}
            >
              <CountdownTimer date={endDate} />
            </ImageBackground>
          </View>
        </Swipeable>
      </TouchableOpacity>

      <View style={{ position: 'absolute', top: -10, left: '50%' }}>
        {/* Maybe consider moving it so it doesn't end up in the scroll view */}
        <FormModal
          component={component}
          onEmit={() => handleClick(undefined)}
          // text="confirm"
        />
      </View>
    </View>
  );
};

export default TaskCard;
