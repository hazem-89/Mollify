import React, { useState, ReactElement } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DisplayTasksBackGround from '../../assets/images/DisplayTasksBackGround.png';
import Button from '../components/buttons/Buttons';
import { Text } from '../components/Text';
import GoBackArrow from '../../assets/images/GoBackArrow.png';
import { useDataContext } from '../util/context/DataContext';
import { useNavigation } from '@react-navigation/native';
import { Confirm } from '../components/Confirm';
import { useLogin } from '../util/auth';
import FormModal from '../components/modals/FormModal';
import RewardMainTitleBg from '../../assets/images/RewardMainTitleBg.png';
import { useDimensions } from '@react-native-community/hooks';

export default function DisplayMenusScreen() {
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const dimensions = useDimensions();
  const [component, setComponent] = useState<ReactElement | undefined>();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const { loggedInProfile, selectedChild } = useDataContext();
  const { currentUser } = useLogin();
  function handleUpdateClick(state: string | undefined) {
    switch (state) {
      case 'deleteProfileConfirm':
        setComponent(
          <Confirm
            text="Are You Sure You want to delete this profile"
            profileId={selectedChild.id}
            confirmBtnText="Delete"
            funName="delete"
          />,
        );
        break;
      case 'deleteacountConfirm':
        setComponent(
          <Confirm
            text="Are You Sure You want to delete Your account"
            accountId={currentUser?.uid}
            confirmBtnText="Confirm"
            funName="delete"
          />,
        );
        break;
      default:
        setComponent(undefined);
    }
  }
  const handelNav = () => {
    // @ts-ignore
    navigation.navigate('TasksCategoryPage', {
      paramKey: {
        content: 'UpdateProfile',
        profile: selectedChild ? selectedChild : loggedInProfile,
      },
    });
  };
  const styles = StyleSheet.create({
    Background: {
      position: 'relative',
      overflowX: 'scroll',
      height: ScreenHeight,
      width: ScreenWidth,
      flex: 1,
      resizeMode: 'stretch',
    },
    SafeArea: {
      overflow: 'hidden',
      position: 'absolute',
      width: ScreenWidth,
      maxWidth: ScreenWidth,
      maxHeight: ScreenHeight,
      height: ScreenHeight,
      display: 'flex',
      alignItems: 'center',
      zIndex: 1,
    },
    leftContainer: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
    },
    inputStyle: {
      fontSize: 35,
      color: 'fff',
      marginBottom: 200,
      borderBottomColor: 'fff',
    },
    GoBackButton: {
      position: 'absolute',
      right: 0.05 * ScreenWidth,
      top: 0.07 * ScreenHeight,
      zIndex: 5,
    },
    GoBackToRoomImageStyle: {
      width: 0.15 * ScreenWidth,
      height: 0.17 * ScreenHeight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    RewardMainTitleBg: {
      width: smallScreen ? 0.25 * ScreenWidth : 0.3 * ScreenWidth,
      height: 0.2 * ScreenHeight,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <>
      <Image source={DisplayTasksBackGround} style={styles.Background} />
      <SafeAreaView style={styles.SafeArea}>
        <View style={{ minWidth: smallScreen ? '20%' : '30%' }}>
          <ImageBackground
            source={RewardMainTitleBg}
            style={styles.RewardMainTitleBg}
          >
            <View style={{ marginBottom: '10%' }}>
              <Text type="header">Settings</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text type="rewardHeader">
            {loggedInProfile && selectedChild
              ? selectedChild?.name
              : loggedInProfile?.name}
            's profile
          </Text>
        </View>
        <View style={styles.GoBackButton}>
          <TouchableOpacity
            // @ts-ignore
            onPress={() => navigation.navigate('RoomScreen')}
          >
            <ImageBackground
              source={GoBackArrow}
              style={styles.GoBackToRoomImageStyle}
            >
              <View style={{ marginRight: '25%', marginBottom: 10 }}>
                <Text type="header">Room</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.leftContainer}>
          <View style={{ marginBottom: 0.02 * ScreenWidth }}>
            <Button
              background="GreenForms"
              text="Update profile"
              onPress={() => {
                handelNav();
              }}
            />
          </View>
          {loggedInProfile &&
            loggedInProfile.parent &&
            loggedInProfile.parent && (
              <View>
                <View style={{ marginBottom: 10 }}>
                  <Button
                    background="Cancel"
                    text="Delete profile"
                    onPress={() => handleUpdateClick('deleteProfileConfirm')}
                  />
                </View>
                <Button
                  background="Cancel"
                  text="Delete account"
                  onPress={() => {
                    handleUpdateClick('deleteacountConfirm');
                  }}
                />
              </View>
            )}
        </View>
        <FormModal
          component={component}
          onEmit={() => handleUpdateClick(undefined)}
          text="Confirm"
        />
      </SafeAreaView>
    </>
  );
}
