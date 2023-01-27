import { useDimensions } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import awardBadge from '../../assets/images/awardBadge.png';
import woodSignLarge from '../../assets/images/woodSignLarge.png';
import { Text } from '../components/Text';
import { useDataContext } from '../util/context/DataContext';
import { avatars, randomColorOptions } from '../util/itemObjects';
import Button from './buttons/Buttons';
import SidebarMenu from './menu/SidebarMenu';

/* type roomProps = {
  addTaskBtnClicked: string;
  setAddTaskBtnClicked: React.Dispatch<
  React.SetStateAction<string | undefined>
  >;
}; */

export default function RoomUI() {
  const [open, setOpen] = useState(false);
  const { tasks, loggedInProfile, selectedChild } = useDataContext();
  const [profileAvatar, setProfileAvatar] = useState<ImageSourcePropType>();
  const dimensions = useDimensions();
  const ScreenWidth = Dimensions.get('window').width;
  // const ScreenHeight = Dimensions.get('window').height;
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const navigation = useNavigation();
  const [color, setColor] = useState<string>();

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

  useEffect(() => {
    if (
      loggedInProfile &&
      loggedInProfile.parent &&
      selectedChild !== undefined
    ) {
      // Logged in profile is a parent, find and render selected child's room
      handleData(selectedChild);
    } else if (loggedInProfile && loggedInProfile.avatar) {
      // Logged in profile is a kid, find and render kid's room.
      handleData(loggedInProfile);
    }
    setColor(
      randomColorOptions[Math.floor(Math.random() * randomColorOptions.length)],
    );
  }, [loggedInProfile, selectedChild]);

  function handleData(profileProp: any) {
    // find and render child's avatar
    const foundAvatar = avatars.find(
      avatar => avatar.id === profileProp.avatar,
    );
    if (foundAvatar && foundAvatar.image) {
      setProfileAvatar(foundAvatar.image);
    }
  }
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
    ProfileInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: smallScreen ? 50 : 60,
      width: smallScreen ? 170 : 230,
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
      zIndex: 1,
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
    AvatarView: {
      width: 0.06 * ScreenWidth,
      height: 0.06 * ScreenWidth,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      borderRadius: 500,
      marginRight: 0.01 * ScreenWidth,
      overflow: 'hidden',
    },
  });

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(false)} activeOpacity={1}>
        <View>
          <View style={styles.imagesContainer}>
            {open && (
              <View style={styles.sidebar}>
                <SidebarMenu setSideBarOpen={setOpen} />
              </View>
            )}
            <ImageBackground
              source={woodSignLarge}
              style={styles.woodLargeStyle}
            >
              <View style={styles.ProfileInfo}>
                <View style={styles.AvatarView}>
                  <Image
                    resizeMode="cover"
                    source={profileAvatar}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </View>
                <Text type="header">
                  {loggedInProfile && !loggedInProfile.parent
                    ? loggedInProfile.name.toUpperCase()
                    : selectedChild?.name.toUpperCase()}
                </Text>
              </View>
            </ImageBackground>
            <ImageBackground source={awardBadge} style={styles.awardBadgeStyle}>
              <Button
                background="TrophyButtonImage"
                onPress={() => {
                  handelNav('DisplayRewards');
                }}
              />
            </ImageBackground>
            <ImageBackground
              source={woodSignLarge}
              style={styles.woodLargeStyle}
            >
              <View style={styles.SidesButtons}>
                {tasks && tasks.length ? (
                  <>
                    <View style={styles.tasksLength}>
                      <Text type="NotificationNum">{tasks.length}</Text>
                    </View>
                  </>
                ) : null}
                <Button
                  background="TodoButtonImage"
                  onPress={() => {
                    handelNav('DisplayTasks');
                  }}
                />
                <Button background="MenuIcon" onPress={() => setOpen(true)} />
              </View>
            </ImageBackground>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
