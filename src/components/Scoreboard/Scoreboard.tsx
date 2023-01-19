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
import RewardCard from './RewardCard';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
// images
import AddButtonImage from '../../../assets/images/AddButton.png';
import RewardMainTitleBg from '../../../assets/images/RewardMainTitleBg.png';
import GoBackArrow from '../../../assets/images/GoBackArrow.png';
import AwardTitleBg from '../../../assets/images/AwardTitleBg.png';
import Zero from '../../../assets/images/Zero.png';
import Twenty from '../../../assets/images/Twenty.png';
import Forty from '../../../assets/images/Forty.png';
import Sixty from '../../../assets/images/Sixty.png';
import Eighty from '../../../assets/images/Eighty.png';
import FullScore from '../../../assets/images/FullScore.png';
import TrophyBig from '../../../assets/images/TrophyBig.png';
import ArrowDown from '../../../assets/images/ArrowDown.png';
import ActiveViewIcon from '../../../assets/images/ActiveViewIcon.png';
import NotActiveViewIcon from '../../../assets/images/NotActiveViewIcon.png';
import { AddTodoForm } from '../forms/AddForm';
import Button from '../buttons/Buttons';
import FormModal from '../modals/FormModal';
import { Confirm } from '../ToDos/Confirm';

const Scoreboard = () => {
  const navigation = useNavigation();
  const dimensions = useDimensions();
  const [component, setComponent] = useState<ReactElement | undefined>();
  const [btnClicked, setBtnClicked] = useState<string | undefined>();
  const [text, setText] = useState<string | undefined>();
  const [profilePoints, setProfilePoints] = useState<number>(0);
  const [selectedReward, setSelectedReward] = useState<any>();
  const [rewardsProcessed, setRewardsProcessed] = useState(false);
  const [selectedForm, setSelectedForm] = useState<ReactElement | undefined>();
  const [addRewardBtnClicked, setAddRewardBtnClicked] =
    useState<boolean>(false);
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const {
    rewards,
    loggedInProfile,
    selectedChild,
    updateFSDoc,
    setRewards,
    retrieveFSData,
  } = useDataContext();
  useEffect(() => {
    if (loggedInProfile) {
      retrieveFSData('Rewards', 'profileId', `${loggedInProfile.id}`).then(
        (data: any) => {
          if (data) setRewards(data);
        },
      );
    }
    if (selectedChild) {
      retrieveFSData('Rewards', 'profileId', `${selectedChild.id}`).then(
        (data: any) => {
          if (data) setRewards(data);
        },
      );
    }
  }, []);
  useEffect(() => {
    if (!rewardsProcessed) {
      setRewardsProcessed(true);
    }
  }, [rewards]);
  useEffect(() => {
    if (rewards?.length > 0) {
      setSelectedReward(rewards[0]);
      setText(rewards[0].title);
      if (loggedInProfile) {
        const profilePoints = +loggedInProfile.points;
        setProfilePoints(profilePoints);
      }
      if (selectedChild) {
        const profilePoints = +selectedChild.points;
        setProfilePoints(profilePoints);
      }
    }
  }, [rewards]);
  const handelNav = (navigationValue: string) => {
    navigationValue === 'DisplayTasks' &&
      // @ts-ignore
      navigation.navigate('TasksCategoryPage', {
        paramKey: {
          content: 'DisplayTasks',
        },
      });
    navigationValue === 'Room' && navigation.goBack();
  };
  function handleClick(state: boolean) {
    setSelectedForm(
      <AddTodoForm
        category="Reward"
        ParentComponent="Reward"
        setAddRewardBtnClicked={setAddRewardBtnClicked}
      />,
    );
    setAddRewardBtnClicked(state);
  }
  function handleFormClick(state: string | undefined, id?: string) {
    setBtnClicked(state);
    switch (state) {
      case 'confirm':
        setComponent(
          <Confirm
            text="Are You Sure you want to delete this reward?"
            rewardId={id}
            confirmBtnText="Delete"
            funName="delete"
          />,
        );
        break;
      default:
        setComponent(undefined);
    }
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
    HederView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: 0.5 * ScreenWidth,
      marginTop: '3%',
      transform: [{ translateX: -50 }],
      maxHeight: 0.2 * ScreenHeight,
    },
    TitleView: {
      minWidth: 0.1 * ScreenWidth,
    },
    RewardMainTitleBg: {
      width: smallScreen ? 0.25 * ScreenWidth : 0.3 * ScreenWidth,
      height: 0.2 * ScreenHeight,
      alignItems: 'center',
      justifyContent: 'center',
    },

    TrophyBigStyleLeft: {
      transform: [{ rotate: '30deg' }],
      height: '100%',
      width: '100%',
    },
    TrophyBigStyleRight: {
      transform: [{ rotate: '-30deg' }],
      height: '100%',
      width: '100%',
    },
    RewardsBody: {
      flexDirection: 'row',
      flex: 1,
      minWidth: ScreenWidth,
      justifyContent: 'flex-start',
    },
    RewardsScrollView: {
      width: 0.1 * ScreenWidth,
      maxWidth: 0.27 * ScreenWidth,
      maxHeight: 0.55 * ScreenHeight,
      marginLeft: 0.04 * ScreenWidth,
    },
    RewardDetails: {
      maxWidth: 0.5 * ScreenWidth,
    },
    GoBackToRoomImageStyle: {
      width: 0.15 * ScreenWidth,
      height: 0.17 * ScreenHeight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    GoToTasksArrowImageStyle: {
      width: 0.15 * ScreenWidth,
      height: 0.17 * ScreenHeight,
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ scaleX: -1 }],
    },
    GoBackButton: {
      position: 'absolute',
      right: 0.05 * ScreenWidth,
      top: 0.07 * ScreenHeight,
    },
    GoToTasksButton: {
      position: 'absolute',
      left: 0.05 * ScreenWidth,
      top: 0.07 * ScreenHeight,
    },
    RewardButtonBg: {
      width: 0.22 * ScreenWidth,
      height: 0.18 * ScreenHeight,
    },
    ProgressBar: {
      width: 0.22 * ScreenWidth,
      height: 0.07 * ScreenHeight,
    },
    DeleteBtn: {
      position: 'absolute',
      right: -0.005 * ScreenWidth,
      top: 0.01 * ScreenHeight,
    },
  });
  return (
    <View style={styles.Container}>
      {/* Display rewards section */}
      {/* Screen Title View */}
      {!addRewardBtnClicked ? (
        <>
          <View style={styles.HederView}>
            <View style={styles.TitleView}>
              <Image source={TrophyBig} style={styles.TrophyBigStyleLeft} />
            </View>
            <View style={{ minWidth: smallScreen ? '20%' : '30%' }}>
              <ImageBackground
                source={RewardMainTitleBg}
                style={styles.RewardMainTitleBg}
              >
                <View style={{ marginBottom: '10%' }}>
                  <Text type="header">Rewards</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.TitleView}>
              <Image source={TrophyBig} style={styles.TrophyBigStyleRight} />
            </View>
          </View>
          {/* display rewards and rewards <details></details> */}
          <View style={styles.RewardsBody}>
            <ScrollView style={styles.RewardsScrollView} horizontal={false}>
              {rewards?.map((reward: any) => {
                const rewardPoints = +reward.points;
                const percentageProgress = (profilePoints / rewardPoints) * 100;
                let imageSource;
                if (percentageProgress > 20 && percentageProgress < 40) {
                  imageSource = Twenty;
                } else if (
                  percentageProgress >= 40 &&
                  percentageProgress < 60
                ) {
                  imageSource = Forty;
                } else if (
                  percentageProgress >= 60 &&
                  percentageProgress < 80
                ) {
                  imageSource = Sixty;
                } else if (
                  percentageProgress >= 80 &&
                  percentageProgress < 100
                ) {
                  imageSource = Eighty;
                } else if (percentageProgress >= 100) {
                  imageSource = FullScore;
                } else if (percentageProgress <= 10) {
                  imageSource = Zero;
                }

                return (
                  <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                      onPress={() => {
                        setText(
                          text && text === reward.title
                            ? undefined
                            : reward.title,
                        );
                        setSelectedReward(reward);
                      }}
                      key={reward.id}
                      style={{
                        position: 'relative',
                        marginBottom: 0.05 * ScreenHeight,
                      }}
                    >
                      <ImageBackground
                        source={AwardTitleBg}
                        style={styles.RewardButtonBg}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 0.055 * ScreenHeight,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '70%',
                            marginLeft: 0.04 * ScreenWidth,
                          }}
                        >
                          <Text>{reward.title}</Text>
                          <Text>{Math.trunc(percentageProgress)}%</Text>
                        </View>
                      </ImageBackground>
                      <Image
                        source={imageSource}
                        style={styles.ProgressBar}
                      ></Image>
                      <View
                        style={{
                          position: 'absolute',
                          left: '0%',
                          top: '0%',
                        }}
                      >
                        <Image
                          source={
                            text && text === reward.title
                              ? ActiveViewIcon
                              : NotActiveViewIcon
                          }
                          style={{
                            width: 0.036 * ScreenWidth,
                            height: 0.07 * ScreenHeight,
                          }}
                        ></Image>
                      </View>
                    </TouchableOpacity>
                    {text && text === reward.title && (
                      <View style={styles.DeleteBtn}>
                        <Button
                          background="DeleteTask"
                          onPress={() => handleFormClick('confirm', reward.id)}
                        />
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>
            {/* Reward details View */}
            {selectedReward && text && (
              <>
                <RewardCard reward={selectedReward} />
              </>
            )}
          </View>
          {/* Position absolute Views  */}
          <View
            style={{
              position: 'absolute',
              left: '10%',
              top: smallScreen ? '10%' : '15%',
            }}
          >
            <Image source={ArrowDown}></Image>
          </View>
          {/* Parent's buttons View */}
          {loggedInProfile && loggedInProfile.parent && (
            <>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 0.05 * ScreenHeight,
                  left: 0.07 * ScreenHeight,
                }}
                onPress={() => handleClick(true)}
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
                  <Text type="rewardDetails"> Add A Reward</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          <View style={styles.GoBackButton}>
            <TouchableOpacity onPress={() => handelNav('Room')}>
              <ImageBackground
                source={GoBackArrow}
                style={styles.GoBackToRoomImageStyle}
              >
                <View style={{ marginRight: '25%' }}>
                  <Text type="header">Room</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>{selectedForm}</>
      )}
      <FormModal
        component={component}
        onEmit={() => handleFormClick(undefined)}
        // text="confirm"
      />
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
