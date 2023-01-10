import React, { ReactElement, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { Tasks } from '../../Interfaces';
import PointsBackground from '../../../assets/Images/Icons/PointsBackground.png';
import TimeBackground from '../../../assets/Images/Icons/TimeBackground.png';
import { useDimensions } from '@react-native-community/hooks';
import colors from '../../constants/colors';
import { Text } from '../../components/Text';
import { CountdownTimer } from './CountDown';
import { Swipeable } from 'react-native-gesture-handler';
import Button from '../buttons/Buttons';
import { useTasks } from '../../util/Context/TaskContext';
import { Confirm } from './Confirm';
import FormModal from '../modals/FormModal';
interface Props {
  task: Tasks;
}

const TaskCard = ({ task }: Props) => {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const [parent, setParent] = useState(true);
  const [component, setComponent] = useState<ReactElement | undefined>();
  const [btnClicked, setBtnClicked] = useState<string | undefined>();
  function handleClick(state: string | undefined) {
    setBtnClicked(state);
    switch (state) {
      case 'confirm':
        setComponent(
          <Confirm
            text="Are You Sure"
            taskId={task.id}
            confirmBtnText="Delete"
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
      flex: 1,
      flexDirection: 'row',
      marginTop: 10,

      maxHeight: smallScreen ? 50 : 75,
      alignItems: 'center',
      marginLeft: smallScreen ? 30 : 50,
    },
    TextView: {
      flex: 1,
      maxWidth: smallScreen ? 250 : 300,
      height: 50,
      justifyContent: 'center',
    },
    TimeBackground: {
      width: smallScreen ? 75 : 100,
      height: smallScreen ? 40 : 50,
    },
    PointsBackground: {
      width: smallScreen ? 40 : 60,
      height: smallScreen ? 40 : 60,
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
      <View style={{ flexDirection: 'row', minWidth: 100 }}>
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
      </View>
    );
  };
  const leftSwipeChilde = () => {
    return null;
  };
  const rightSwipe = () => {
    return (
      <View>
        <Button background="DoneIcon" onPress={() => console.warn(task.id)} />
      </View>
    );
  };

  return (
    <View style={styles.CardContainer}>
      {!btnClicked ? (
        <TouchableOpacity activeOpacity={0.6}>
          <Swipeable
            renderLeftActions={parent ? leftSwipe : leftSwipeChilde}
            renderRightActions={rightSwipe}
          >
            <View
              style={{
                flexDirection: 'row',
                width: smallScreen ? 350 : 500,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: colors.primary,
              }}
            >
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
                    height: smallScreen ? 40 : 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text type="todoList">{task.pointsValue}</Text>
                </View>
              </ImageBackground>
              <ImageBackground
                source={TimeBackground}
                style={styles.TimeBackground}
              >
                <View
                  style={{
                    width: smallScreen ? 75 : 100,
                    height: smallScreen ? 40 : 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CountdownTimer date={endDate} />
                  {/* <Text type="todoList">{task.endTime}</Text> */}
                </View>
              </ImageBackground>
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
