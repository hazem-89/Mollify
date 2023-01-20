import React, { useEffect, useState } from 'react';
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
import lightningBig from '../../../assets/images/lightningBig.png';
import hourglassBig from '../../../assets/images/hourglassBig.png';
import { CountdownTimer } from '../ToDos/CountDown';
import { useDataContext } from '../../util/context/DataContext';
interface Props {
  reward: Rewards;
}
const RewardCard = ({ reward }: Props) => {
  const [profilePoints, setProfilePoints] = useState<number>(0);
  const dimensions = useDimensions();
  const endDate = new Date(reward.endTime);
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const { rewards, loggedInProfile, selectedChild } = useDataContext();
  useEffect(() => {
    if (loggedInProfile) {
      const profilePointsNum = +loggedInProfile.points;
      setProfilePoints(profilePointsNum);
    }
    if (selectedChild) {
      const profilePointsNum = +selectedChild.points;
      setProfilePoints(profilePointsNum);
    }
  }, [rewards]);
  const rewardPoints = +reward.points;

  const PointsLeft = rewardPoints - profilePoints;

  const percentageProgress = (profilePoints / rewardPoints) * 100;
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
  } else if (percentageProgress <= 10) {
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
  };

  const [smallScreen] = useState(dimensions.screen.height < 600);
  const styles = StyleSheet.create({
    CardContainer: {
      width: 0.6 * ScreenWidth,
      height: ScreenHeight,
      alignItems: 'center',
      // justifyContent: 'center',
    },
    TextView: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    PointsIconTitle: {
      width: 0.025 * ScreenWidth,
      height: 0.08 * ScreenHeight,
    },
    PointsView: {
      flexDirection: 'row',
      minHeight: 0.2 * ScreenHeight,
      width: ScreenWidth,
      alignItems: 'center',
      justifyContent: 'center',
    },
    PointsIcon: {
      width: 0.05 * ScreenWidth,
      height: 0.165 * ScreenHeight,
    },

    PointsDetails: {
      marginLeft: 0.04 * ScreenWidth,
      width: 0.45 * ScreenWidth,
    },
    ProgressBar: {
      width: 0.35 * ScreenWidth,
      height: 0.13 * ScreenHeight,
    },
    TimeView: {
      flexDirection: 'row',
      minHeight: 0.2 * ScreenHeight,
      width: ScreenWidth,
      alignItems: 'center',
      justifyContent: 'center',
    },

    TimeDetails: {
      width: 0.45 * ScreenWidth,
      marginLeft: 0.04 * ScreenWidth,
    },
  });

  return (
    <View style={styles.CardContainer}>
      <View style={styles.TextView}>
        <Text type="rewardHeader">
          {reward.title}\{reward.points}
        </Text>
        <Image source={lightningBig} style={styles.PointsIconTitle}></Image>
      </View>
      <View style={styles.PointsView}>
        <Image source={lightningBig} style={styles.PointsIcon}></Image>
        <View style={styles.PointsDetails}>
          <Image source={imageSource} style={styles.ProgressBar}></Image>
          <Text type="rewardDetails">
            You need {PointsLeft} more points{' '}
            <Image source={lightningBig} style={styles.PointsIconTitle}></Image>{' '}
            to earn this reward
          </Text>
        </View>
      </View>
      <View>
        <Text type="rewardDetails">&</Text>
      </View>
      <View style={styles.TimeView}>
        <View>
          <Image source={hourglassBig} style={styles.PointsIcon}></Image>
        </View>
        <View>
          <View style={styles.TimeDetails}>
            <Text type="rewardDetails">
              You Have <CountdownTimer date={endDate} /> To earn it.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RewardCard;
