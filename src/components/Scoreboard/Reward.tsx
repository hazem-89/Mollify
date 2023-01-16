import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import { Rewards } from '../../Interfaces';
import { Text } from '../../components/Text';
interface Props {
  reward: Rewards;
}

const Reward = ({ reward }: Props) => {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  // const [RewardRequestStatus, setRewardRequestStatus] = useState(
  //   reward.hasRequest,
  // );

  let updateAcceptedReq = {};
  const handleRewardRequestStatus = async (
    status: boolean,
    funName: string,
  ) => {
    if (funName === 'updateRequest') {
      updateAcceptedReq = {
        ...reward,
        hasRequest: status,
      };
    } else if (funName === 'updateTaskDone') {
      updateAcceptedReq = {
        ...reward,
        isDone: status,
        hasRequest: false,
      };
    }

    // if (reward.id) {
    //   try {
    //     await setDoc(doc(db, 'Rewards', reward?.id), updateAcceptedReq);
    //     setRewardRequestStatus(status);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };

  const endDate = new Date(reward.endTime);

  const styles = StyleSheet.create({
    CardContainer: {},
    TextView: {
      flex: 1,
      maxWidth: smallScreen ? 250 : 300,
      height: 50,
      justifyContent: 'center',
    },
    taskView: {
      flexDirection: 'row',
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

  return (
    <View style={styles.CardContainer}>
      <View style={styles.taskView}>
        <Text type="todoList">{reward.title}</Text>
        <Text type="todoList">{reward.points}</Text>
      </View>
    </View>
  );
};

export default Reward;
