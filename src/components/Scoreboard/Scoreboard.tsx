import { useDimensions } from '@react-native-community/hooks';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useDataContext } from '../../util/context/DataContext';
import { Text } from '../../components/Text';
import { Rewards } from '../../Interfaces';
import CountDownGreenBg from '../../../assets/images/CountDownGreenBg.png';
import AddButtonImage from '../../../assets/images/AddButton.png';
import GoldenArrow from '../../../assets/images/GoldenArrow.png';
import GoBackArrow from '../../../assets/images/GoBackArrow.png';
import awardBadge from '../../../assets/images/awardBadge.png';
import Eighty from '../../../assets/images/Eighty.png';
import Forty from '../../../assets/images/Forty.png';
import Twenty from '../../../assets/images/Twenty.png';
import Zero from '../../../assets/images/Zero.png';
import FullScore from '../../../assets/images/FullScore.png';
import Sixty from '../../../assets/images/Sixty.png';

// images
import TrophyBig from '../../../assets/images/TrophyBig.png';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { DocumentData } from 'firebase/firestore';
const Scoreboard = () => {
  const [text, setText] = useState<string | undefined>();
  const [parent, setParent] = useState(true);
  const [percentage, setPercentage] = useState();
  const navigation = useNavigation();
  const dimensions = useDimensions();
  const [rewardsProcessed, setRewardsProcessed] = useState(false);

  const [smallScreen] = useState(dimensions.screen.height < 600);
  const { retrieveFSData, rewards, setRewards } = useDataContext();
  useEffect(() => {
    // Retrieve tasks, replace Lgq9YJnPLLezb1iE4xHQ with current profile id
    retrieveFSData('Rewards', 'asignedProfileId', 'pjVcsYpBE46nGlDmHmO0').then(
      (data: any) => {
        if (data) {
          setRewards(data);
          setRewardsProcessed(true);
          // getRewardsProgress();
        }
      },
    );
  }, []);
  useEffect(() => {
    if (!rewardsProcessed) {
      setRewardsProcessed(true);
    }
  }, [rewards]);

  const handelNav = (navigationValue: string) => {
    // console.log(navigationValue);

    navigationValue === 'DisplayTasks' &&
      // @ts-ignore
      navigation.navigate('TasksCategoryPage', {
        paramKey: {
          content: 'DisplayTasks',
        },
      });
    navigationValue === 'Room' && navigation.goBack();
  };
  function handlePercentage(state: number) {
    // setAddTaskBtnClicked(state);
  }
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      width: ScreenWidth,
      maxWidth: ScreenWidth,
      height: ScreenHeight,
      alignItems: 'center',
    },
    TitleView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: smallScreen ? 250 : 320,
      marginTop: smallScreen ? 10 : 20,
    },
    TrophyBigStyleLeft: {
      transform: [{ rotate: '30deg' }],
      height: smallScreen ? 100 : 120,
      width: smallScreen ? 80 : 90,
    },
    TrophyBigStyleRight: {
      transform: [{ rotate: '-30deg' }],
      height: smallScreen ? 100 : 120,
      width: smallScreen ? 80 : 90,
    },
    RewardsBody: {
      flexDirection: 'row',
      flex: 1,
      // width: '100%',
      minWidth: smallScreen ? 750 : 850,
      justifyContent: 'flex-start',
    },
    RewardsScrollView: {
      maxWidth: smallScreen ? 160 : 250,
      maxHeight: smallScreen ? 220 : 370,
    },
    RewardDetails: {},
    GoldenArrow: {
      width: smallScreen ? 350 : 500,
      height: smallScreen ? 150 : 200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    GoBackToRoomImageStyle: {
      width: smallScreen ? 150 : 200,
      height: smallScreen ? 75 : 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    GoToTasksArrowImageStyle: {
      width: smallScreen ? 150 : 200,
      height: smallScreen ? 75 : 100,
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ scaleX: -1 }],
    },
    GoBackButton: {
      position: 'absolute',
      right: 30,
      top: smallScreen ? 30 : 40,
    },
    GoToTasksButton: {
      position: 'absolute',
      left: 30,
      top: smallScreen ? 30 : 40,
    },
    RewardButtonBg: {
      width: smallScreen ? 150 : 250,
      height: smallScreen ? 75 : 130,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ProgressBar: {
      width: smallScreen ? 150 : 250,
      height: smallScreen ? 30 : 50,
      marginBottom: smallScreen ? 15 : 15,
    },
  });
  return (
    <View style={styles.Container}>
      {/* Display rewards section */}
      {/* Screen Title View */}
      <View style={styles.TitleView}>
        <Image source={TrophyBig} style={styles.TrophyBigStyleLeft} />
        <Text type="header">Rewards</Text>
        <Image source={TrophyBig} style={styles.TrophyBigStyleRight} />
      </View>
      {/* display rewards and rewards <details></details> */}
      <View style={styles.RewardsBody}>
        <ScrollView style={styles.RewardsScrollView} horizontal={false}>
          <>
            {rewards?.map((reward: any) => {
              // earnedPoints need  to be replaced withe profile.points
              const earnedPoints = 150;
              const test = +reward.points;

              const percentageDiff = (earnedPoints / test) * 100;
              let imageSource;
              if (percentageDiff > 20 && percentageDiff < 40) {
                imageSource = Twenty;
              } else if (percentageDiff >= 40 && percentageDiff < 60) {
                imageSource = Forty;
              } else if (percentageDiff >= 60 && percentageDiff < 80) {
                imageSource = Sixty;
              } else if (percentageDiff >= 80 && percentageDiff < 100) {
                imageSource = Eighty;
              } else if (percentageDiff >= 100) {
                imageSource = FullScore;
              } else if (percentageDiff <= 0) {
                imageSource = Zero;
              }

              return (
                <TouchableOpacity onPress={() => console.log(reward)}>
                  <ImageBackground
                    source={awardBadge}
                    style={styles.RewardButtonBg}
                  >
                    <Text>{reward.title}</Text>
                  </ImageBackground>
                  <Image
                    source={imageSource}
                    style={styles.ProgressBar}
                  ></Image>
                </TouchableOpacity>
              );
            })}
          </>
        </ScrollView>
        {/* Reward details View */}
        {text ? (
          <>
            <View style={styles.RewardDetails}>
              <Text>
                blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </Text>
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                marginBottom: 60,
              }}
            >
              <ImageBackground source={GoldenArrow} style={styles.GoldenArrow}>
                <View style={{ marginLeft: smallScreen ? 15 : 20 }}>
                  <Text type="header">
                    Select a Reward for more information
                  </Text>
                </View>
              </ImageBackground>
            </View>
            {/* <ImageBackground source={GoldenArrow} style={styles.GoldenArrow}>
              <View style={{ marginLeft: smallScreen ? 15 : 20 }}>
              </View>
            </ImageBackground> */}
          </>
        )}
      </View>
      {/* Position absolute Views  */}
      {/* Add button View */}
      {/* {parent && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: smallScreen ? 10 : 20,
            left: smallScreen ? 30 : 40,
          }}
          // onPress={() => handleClick(category)}
        >
          <ImageBackground
            source={CountDownGreenBg}
            style={{
              alignItems: 'center',
              width: smallScreen ? 150 : 180,
              height: smallScreen ? 90 : 110,
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              <Image
                source={AddButtonImage}
                style={{
                  width: smallScreen ? 40 : 50,
                  height: smallScreen ? 40 : 50,
                }}
              />
              <Text type="text"> Add A Reward</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )} */}
      <View style={styles.GoBackButton}>
        <TouchableOpacity onPress={() => handelNav('Room')}>
          <ImageBackground
            source={GoBackArrow}
            style={styles.GoBackToRoomImageStyle}
          >
            <View style={{ marginRight: 50 }}>
              <Text type="header">Room</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.GoToTasksButton}>
        <TouchableOpacity onPress={() => handelNav('TasksCategoryPage')}>
          <ImageBackground
            source={GoBackArrow}
            style={styles.GoToTasksArrowImageStyle}
          >
            <View style={{ marginRight: 50, transform: [{ scaleX: -1 }] }}>
              <Text type="header">Tasks</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View> */}
      {/* <View>
        <View></View>
      </View> */}
    </View>
  );
};

export default Scoreboard;
