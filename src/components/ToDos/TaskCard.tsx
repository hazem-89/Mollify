import { useDimensions } from '@react-native-community/hooks';
import { doc, setDoc } from 'firebase/firestore';
import React, { ReactElement, useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Text } from '../../components/Text';
import { Tasks } from '../../Interfaces';
import { db } from '../../../firebaseConfig';
import { useDataContext } from '../../util/context/DataContext';
import Button from '../buttons/Buttons';
import FormModal from '../modals/FormModal';
// Images
import CountDownGreenBg from '../../../assets/images/CountDownGreenBg.png';
import CountDownBg from '../../../assets/images/CountDownStoneBg.png';
import TaskInReviewNotifChilled from '../../../assets/images/Icons/TaskInReviewNotifChilled.png';
import PointsBg from '../../../assets/images/PointsBg.png';
import PointsGreenBg from '../../../assets/images/PointsGreenBg.png';
import TaskInReviewTextBg from '../../../assets/images/TaskInReviewTextBg.png';
import TaskTextBg from '../../../assets/images/TaskTextBg.png';
import { Confirm } from './Confirm';
import { CountdownTimer } from './CountDown';

interface Props {
  task: Tasks;
}

const TaskCard = ({ task }: Props) => {
  const {
    retrieveFSData,
    setRewards,
    loggedInProfile,
    selectedChild,
    updateFSDoc,
  } = useDataContext();
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const [swipeOn, setSwipeOn] = useState(false);
  const [component, setComponent] = useState<ReactElement | undefined>();
  const [btnClicked, setBtnClicked] = useState<string | undefined>();
  let updateAcceptedReq = {};
  const endDate = new Date(task.endTime);

  const handleTaskRequestStatus = async (funName: string) => {
    if (funName === 'updateRequest') {
      updateAcceptedReq = {
        ...task,
        hasRequest: true,
      };
    } else if (funName === 'updateTaskDone') {
      updateAcceptedReq = {
        ...task,
        isDone: true,
        hasRequest: false,
      };
    }
    if (task.id) {
      try {
        if (selectedChild) {
          await updateFSDoc('Tasks', task?.id, updateAcceptedReq);
          retrieveFSData('Tasks', 'profileId', selectedChild.id).then(
            (data: any) => {
              if (data) setRewards(data);
            },
          );
        } else if (loggedInProfile) {
          await updateFSDoc('Tasks', task?.id, updateAcceptedReq);
          retrieveFSData('Tasks', 'profileId', loggedInProfile.id).then(
            (data: any) => {
              if (data) setRewards(data);
            },
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
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
            markTaskDone={() => handleTaskRequestStatus('updateTaskDone')}
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
            UpdateReqStatus={() => handleTaskRequestStatus('updateRequest')}
          />,
        );
        break;
      default:
        setComponent(undefined);
    }
  }

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
        {loggedInProfile && loggedInProfile.parent ? (
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
      {task.hasRequest &&
        loggedInProfile &&
        loggedInProfile.parent &&
        !swipeOn &&
        !btnClicked && (
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
      {task.hasRequest &&
        loggedInProfile &&
        !loggedInProfile.parent &&
        !swipeOn &&
        !btnClicked && (
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
            />
          </View>
        )}

      <TouchableOpacity
        onPress={() =>
          loggedInProfile && !loggedInProfile.parent && !task.hasRequest
            ? handleClick('updateRequest')
            : null
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
                <View style={{ marginBottom: 5 }}>
                  <Text type="text">{task.taskDescription}</Text>
                </View>
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
