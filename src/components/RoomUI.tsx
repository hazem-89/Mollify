import { useDimensions } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import awardBadge from '../../assets/images/awardBadge.png';
import woodSignLarge from '../../assets/images/woodSignLarge.png';
import { Text } from '../components/Text';
import { useLogin } from '../util/auth';
import { useDataContext } from '../util/context/DataContext';
import Button from './buttons/Buttons';
import SidebarMenu from './menu/SidebarMenu';
import FormModal from './modals/FormModal';

/* type roomProps = {
  addTaskBtnClicked: string;
  setAddTaskBtnClicked: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}; */

export default function RoomUI() {
  const [open, setOpen] = useState(false);
  const { tasks } = useDataContext();
  const { logout } = useLogin();
  const navigation = useNavigation();
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const [btnClicked, setBtnClicked] = useState<string | undefined>();
  const [component, setComponent] = useState<ReactElement | undefined>();
  const [text, setText] = useState<string | undefined>();
  const [addTaskBtnClicked, setAddTaskBtnClicked] = useState<
    string | undefined
  >();

  // this not used right now maybe we will need it
  function handleClick(state: string | undefined) {
    setAddTaskBtnClicked(state);
    switch (
    state
    // case 'displayTask':
    //   // setComponent(<DisplayTasksCategories />);
    //   setText('Tasks');
    //   break;
    // case 'displayScoreboard':
    //   setComponent(<Scoreboard />);
    //   setText('Scoreboard');
    //   break;
    // default:
    //   setComponent(undefined);
    //   break;
    ) {
    }
  }

  const handelNav = (navigationValue: string) => {
    if (navigationValue === 'DisplayTasks') {
      // @ts-ignore
      navigation.navigate('TasksCategoryPage', {
        paramKey: {
          content: 'DisplayTasks',
        },
      });
    }
    if (navigationValue === 'DisplayRewards') {
      // @ts-ignore
      navigation.navigate('TasksCategoryPage', {
        paramKey: {
          content: 'DisplayRewards',
        },
      });
    }
  };

  const ScreenWidth = Dimensions.get('window').width;
  // const ScreenHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    imagesContainer: {
      width: '100%',
      maxWidth: ScreenWidth,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    woodLargeStyle: {
      width: smallScreen ? 210 : 300,
      height: smallScreen ? 120 : 160,
      marginTop: smallScreen ? -40 : -50,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    awardBadgeStyle: {
      width: smallScreen ? 160 : 200,
      height: smallScreen ? 80 : 105,
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoAlign: {
      position: 'absolute',
      right: smallScreen ? 45 : 50,
      top: smallScreen ? 20 : 20,
    },
    todoAlign: {
      position: 'absolute',
      right: smallScreen ? 120 : 180,
      top: smallScreen ? 20 : 20,
    },
    bellAlign: {
      position: 'absolute',
      left: smallScreen ? 150 : 200,
      top: smallScreen ? 20 : 30,
    },
    trophyAlign: {
      position: 'absolute',
      left: '50%',
      top: smallScreen ? 17 : 25,
    },
    signAlign: {
      position: 'absolute',
      left: smallScreen ? 40 : 40,
      bottom: smallScreen ? 0 : -5,
      width: smallScreen ? 100 : 165,
      height: smallScreen ? 125 : 210,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    SidesButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: smallScreen ? 50 : 60,
      width: smallScreen ? 170 : 230,
      justifyContent: 'space-between',
    },
    tasksLength: {
      position: 'absolute',
      backgroundColor: 'rgba(86, 222, 245, .8)',
      width: smallScreen ? 20 : 30,
      height: smallScreen ? 20 : 30,
      alignItems: 'center',
      zIndex: 99,
      bottom: smallScreen ? 0 : -10,
      left: smallScreen ? -5 : -10,
      borderRadius: 50,
    },
    menuBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    sidebar: {
      // flex: 1,
      display: open ? 'flex' : 'none',
      position: 'relative',
    },
    arrowStyle: {
      display: open ? 'flex' : 'none',
      position: 'absolute',
      top: smallScreen ? 0 : 140,
      right: smallScreen ? 100 : 210,
    },
  });

  return (
    <>
      <View style={{}}>
        <TouchableOpacity onPress={() => setOpen(false)} activeOpacity={1}>
          {!addTaskBtnClicked ? (
            <View>
              <View style={styles.imagesContainer}>
                {open && (
                  <View style={styles.sidebar}>
                    <SidebarMenu />
                  </View>
                )}
                <ImageBackground
                  source={woodSignLarge}
                  style={styles.woodLargeStyle}
                >
                  <View style={styles.SidesButtons}>
                    <Button background="BellButtonImage" onPress={logout} />
                    <Button
                      background="BellButtonImage"
                      onPress={() => console.log('log')}
                    />
                  </View>
                </ImageBackground>
                {/* <Image source={woodSignLarge} style={styles.woodLargeStyle} /> */}
                <ImageBackground
                  source={awardBadge}
                  style={styles.awardBadgeStyle}
                >
                  <Button
                    background="TrophyButtonImage"
                    onPress={() => {
                      handelNav('DisplayRewards');
                    }}
                  />
                </ImageBackground>
                {/* <Image source={awardBadge} style={styles.awardBadgeStyle} /> */}
                <ImageBackground
                  source={woodSignLarge}
                  style={styles.woodLargeStyle}
                >
                  <View style={styles.SidesButtons}>
                    {tasks.length ? (
                      <>
                        <View style={styles.tasksLength}>
                          <Text type="NotificationNum">{tasks.length}</Text>
                        </View>
                      </>
                    ) : null}
                    <Button
                      background="TodoButtonImage"
                      onPress={() => {
                        // handleClick('displayTask');
                        handelNav('DisplayTasks');
                      }}
                    />
                    <Button
                      background="MenuIcon"
                      onPress={() => setOpen(true)}
                    />
                  </View>
                </ImageBackground>
              </View>

              {/* {open ? (
                <View style={styles.arrowStyle}>
                  <Button
                    background="GoBackArrowLeft"
                    onPress={() => setOpen(false)}
                  />
                </View>
              ) : null} */}
            </View>
          ) : (
            <FormModal
              component={component}
              onEmit={() => handleClick(undefined)}
              text={text}
            />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
