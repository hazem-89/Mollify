import React, { useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import { Rewards } from '../../Interfaces';
import { Text } from '../Text';

import Zero from '../../../assets/images/Zero.png';
import Twenty from '../../../assets/images/Twenty.png';
import Forty from '../../../assets/images/Forty.png';
import Sixty from '../../../assets/images/Sixty.png';
import Eighty from '../../../assets/images/Eighty.png';
import FullScore from '../../../assets/images/FullScore.png';
interface Props {
  reward: Rewards;
}
const RewardCard = ({ reward }: Props) => {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  // const [RewardRequestStatus, setRewardRequestStatus] = useState(
  //   reward.hasRequest,
  // );
  const earnedPoints = 150;
  const test = +reward.points;

  const percentageProgress = (earnedPoints / test) * 100;
  let imageSource;
  if (percentageProgress > 20 && percentageProgress < 40) {
    imageSource = Twenty;
  } else if (percentageProgress >= 40 && percentageProgress < 60) {
    imageSource = Forty;
  } else if (percentageProgress >= 60 && percentageProgress < 80) {
    imageSource = Sixty;
  } else if (percentageProgress >= 80 && percentageProgress < 100) {
    imageSource = Eighty;
  } else if (percentageProgress >= 100) {
    imageSource = FullScore;
  } else if (percentageProgress <= 0) {
    imageSource = Zero;
  }
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
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    CardContainer: {
      width: 0.6 * ScreenWidth,
    },
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
        {/* <Image source={imageSource}></Image> */}
      </View>
    </View>
  );
};

export default RewardCard;
