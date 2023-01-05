import { useDimensions } from '@react-native-community/hooks';
import React, { ReactElement, useState } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import awardBadge from '../../assets/Images/awardBadge.png';
import roomExample from '../../assets/Images/roomExample.png';
import woodSignLarge from '../../assets/Images/woodSignLarge.png';
import { useLogin } from '../util/auth';
import Button from './buttons/Buttons';
import FormModal from './modals/FormModal';
import { AddToDo } from './ToDos/AddToDo';

// type roomProps = {
//   addTaskBtnClicked: string;
//   setAddTaskBtnClicked: React.Dispatch<
//     React.SetStateAction<string | undefined>
//   >;
// };

export const RoomUI = () => {
  const { logout } = useLogin();
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
      case 'AddToDo':
        setComponent(<AddToDo />);
        setText('addTask');
        break;
      default:
        setComponent(undefined);
        break;
    }
  }

  const styles = StyleSheet.create({
    imagesContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 10,
    },
    woodLargeStyle: {
      width: smallScreen ? 210 : 310,
      height: smallScreen ? 120 : 180,
      marginTop: smallScreen ? -40 : -65,
    },
    awardBadgeStyle: {
      width: smallScreen ? 130 : 170,
      height: smallScreen ? 70 : 100,
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
      left: smallScreen ? 100 : 200,
      top: smallScreen ? 20 : 30,
    },
    trophyAlign: {
      position: 'absolute',
      left: smallScreen ? 300 : 510,
      top: smallScreen ? 17 : 25,
    },
    signAlign: {
      position: 'absolute',
      left: smallScreen ? 40 : 40,
      bottom: smallScreen ? 0 : -5,
    },
  });

  return (
    <ImageBackground source={roomExample}>
      <SafeAreaView>
        <View style={{ height: '100%' }}>
          <View style={styles.imagesContainer}>
            <Image source={woodSignLarge} style={styles.woodLargeStyle} />
            <Image source={awardBadge} style={styles.awardBadgeStyle} />
            <Image source={woodSignLarge} style={styles.woodLargeStyle} />
            <View style={styles.infoAlign}>
              <Button
                background="InfoButtonImage"
                onPress={() => setBtnClicked(undefined)}
              />
            </View>
            <View style={styles.todoAlign}>
              <Button
                background="TodoButtonImage"
                onPress={() => {
                  handleClick('AddToDo');
                }}
              />
            </View>
            <View style={styles.bellAlign}>
              <Button background="BellButtonImage" onPress={logout} />
            </View>
            <View style={styles.trophyAlign}>
              <Button
                background="TrophyButtonImage"
                onPress={() => setBtnClicked(undefined)}
              />
            </View>
          </View>
          <View style={styles.signAlign}>
            <Button
              background="SignButtonImage"
              onPress={() => setBtnClicked(undefined)}
            />
          </View>
        </View>
        <FormModal
          component={component}
          onEmit={() => handleClick(undefined)}
          text={text}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};
