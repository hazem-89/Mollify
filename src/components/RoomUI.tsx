import { useDimensions } from '@react-native-community/hooks';
import React, { ReactElement, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import awardBadge from '../../assets/Images/awardBadge.png';
import woodSignLarge from '../../assets/Images/woodSignLarge.png';
import { useLogin } from '../util/auth';
import Button from './buttons/Buttons';
import FormModal from './modals/FormModal';
import Scoreboard from './Scoreboard/Scoreboard';
import { DisplayTasksCategories } from './ToDos/DisplayTasksCategories';
import SignButtonImage from '../../assets/Images/sign.png';
import { useNavigation } from '@react-navigation/native';

/* type roomProps = {
  addTaskBtnClicked: string;
  setAddTaskBtnClicked: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}; */

export default function RoomUI() {
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
  function handleClick(state: string | undefined) {
    setAddTaskBtnClicked(state);
    switch (state) {
      case 'displayTask':
        // setComponent(<DisplayTasksCategories />);
        setText('Tasks');
        break;
      case 'displayScoreboard':
        setComponent(<Scoreboard />);
        setText('Scoreboard');
        break;
      default:
        setComponent(undefined);
        break;
    }
  }
  const handelNav = (category?: string) => {
    // @ts-ignore
    navigation.navigate('TasksCategoryPage', {
      paramKey: {
        category: category,
        content: 'DisplayTasks',
      },
    });
  };
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    imagesContainer: {
      width: ScreenWidth,
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
      width: smallScreen ? 130 : 170,
      height: smallScreen ? 70 : 100,
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
  });

  return (
    <>
      {!addTaskBtnClicked ? (
        <View style={{ height: '100%' }}>
          <View style={styles.imagesContainer}>
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
            <ImageBackground source={awardBadge} style={styles.awardBadgeStyle}>
              <Button
                background="TrophyButtonImage"
                onPress={() => setBtnClicked(undefined)}
              />
            </ImageBackground>
            {/* <Image source={awardBadge} style={styles.awardBadgeStyle} /> */}
            <ImageBackground
              source={woodSignLarge}
              style={styles.woodLargeStyle}
            >
              <View style={styles.SidesButtons}>
                <Button
                  background="TodoButtonImage"
                  onPress={() => {
                    // handleClick('displayTask');
                    handelNav();
                  }}
                />
                <Button
                  background="InfoButtonImage"
                  onPress={() => setBtnClicked(undefined)}
                />
              </View>
            </ImageBackground>
          </View>
          <ImageBackground source={SignButtonImage} style={styles.signAlign}>
            <View
              style={{
                marginTop: smallScreen ? 15 : 30,
              }}
            >
              <Text>Name</Text>
            </View>
          </ImageBackground>
        </View>
      ) : (
        <FormModal
          component={component}
          onEmit={() => handleClick(undefined)}
          text={text}
        />
      )}
    </>
  );
}
