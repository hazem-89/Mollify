import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';
import { Text } from '../components/Text';
import awardBadge from '../../assets/Images/awardBadge.png';
import woodSignLarge from '../../assets/Images/woodSignLarge.png';
import Button from './buttons/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import roomExample from '../../assets/Images/roomExample.png';
import FormModal from './modals/FormModal';
import TodoFormModel from './modals/TodoFormModel';
import { AddToDo } from './ToDos/AddToDo';
type roomProps = {
  addTaskBtnClicked: string;
  setAddTaskBtnClicked: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};
const RoomUI = () => {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const [btnClicked, setBtnClicked] = useState<string | undefined>();
  const [component, setComponent] = useState<JSX.Element | undefined>();
  const [addTaskBtnClicked, setAddTaskBtnClicked] = useState<
    string | undefined
  >();
  function handleClick(state: string | undefined) {
    setAddTaskBtnClicked(state);
    switch (state) {
      case 'AddToDo':
        setComponent(<AddToDo />);
        break;
      // case 'AddCleaningToDo':
      //   setComponent(<AddCleaningToDo />);
      //   break;
      // // case 'GoogleSignIn':
      // //   setComponent(undefined);
      // //   break;
      // // default:
      // //   setComponent(undefined);
      // //   break;
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
                  console.log(component);

                  handleClick('AddToDo');
                }}
              />
            </View>
            <View style={styles.bellAlign}>
              <Button
                background="BellButtonImage"
                onPress={() => setBtnClicked(undefined)}
              />
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
        {/* <FormModal onEmit={handleEmit} formName={btnClicked} /> */}
        <TodoFormModel
          onTaskEmit={() => handleClick(undefined)}
          component={component}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RoomUI;

const styles = StyleSheet.create({});
