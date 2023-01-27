import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useDataContext } from '../util/context/DataContext';
import Button from './buttons/Buttons';
import { Text } from './Text';
import { useNavigation } from '@react-navigation/native';
import { useLogin } from '../util/auth';
import { DocumentData } from 'firebase/firestore';
import Toast from 'react-native-root-toast';
import { Audio } from 'expo-av';
type ConfirmProps = {
  text: string;
  taskId?: string;
  confirmBtnText: string;
  funName?: string;
  onClose?: () => void;
  markTaskDone?: (a: string) => void;
  UpdateReqStatus?: (a: string) => void;
  rewardId?: string;
  profileId?: string;
  accountId?: string;
};

export const Confirm = ({
  text,
  taskId,
  confirmBtnText,
  onClose,
  markTaskDone,
  UpdateReqStatus,
  funName,
  rewardId,
  profileId,
  accountId,
}: ConfirmProps) => {
  const {
    deleteDocFromFS,
    selectedChild,
    setTasks,
    setRewards,
    retrieveFSData,
    loggedInProfile,
    setProfiles,
  } = useDataContext();
  const { currentUser, deleteAccount, logout } = useLogin();
  const navigation = useNavigation();
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    (async () => {
      const sound1 = new Audio.Sound();
      sound1.loadAsync(require('../../assets/sounds/taskRequest.mp3'));
      setSound(sound1);
    })();
  }, []);

  const handlePlaySound = async () => {
    if (sound && sound._loaded) {
      await sound.playAsync();
    }
  };
  /**
   *  handel confirm delete and update fpr tasks, reward, profiles, and accounts
   */
  const handleSubmit = () => {
    if (funName === 'delete' && taskId) {
      deleteDocFromFS('Tasks', taskId);
      Toast.show('  Task deleted successfully.  ', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      retrieveFSData('Tasks', 'profileId', `${selectedChild.id}`).then(
        (data: any) => {
          data ? setTasks(data) : setTasks([]);
        },
      );
      // parent confirm if task is done task as done
    } else if (funName === 'updateTaskDone') {
      if (markTaskDone) {
        markTaskDone(funName);
        deleteDocFromFS('Tasks', taskId);
        Toast.show('  This task is marked as done now.  ', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        retrieveFSData('Tasks', 'profileId', `${selectedChild.id}`).then(
          (data: any) => {
            data ? setTasks(data) : setTasks([]);
          },
        );
      }
      // chilled request when th task is done
    } else if (funName === 'updateRequest') {
      if (UpdateReqStatus) {
        UpdateReqStatus(funName);
        Toast.show('  Request for checking task is sent.  ', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        handlePlaySound();
        retrieveFSData('Tasks', 'profileId', `${loggedInProfile?.id}`).then(
          (data: any) => {
            if (data) setTasks(data);
          },
        );
      }
    } else if (funName === 'delete' && rewardId) {
      deleteDocFromFS('Rewards', rewardId);
      Toast.show('  Reward deleted successfully.  ', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      retrieveFSData('Rewards', 'profileId', `${selectedChild.id}`).then(
        (data: any) => {
          data ? setRewards(data) : setRewards([]);
        },
      );
    } else if (funName === 'delete' && profileId) {
      deleteDocFromFS('profiles', profileId);
      Toast.show('  This profile deleted successfully.  ', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      retrieveFSData('profiles', 'mainUserId', `${currentUser?.uid}`).then(
        (data: DocumentData) => {
          data ? setProfiles(data) : setProfiles(undefined);
        },
      );
      // @ts-ignore
      navigation.navigate('StartScreen');
    } else if (funName === 'delete' && accountId) {
      deleteDocFromFS('users', accountId);
      deleteAccount();
      Toast.show('  You account deleted successfully.  ', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      logout();
    }
    if (onClose) {
      onClose();
    }
  };
  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    container: {
      width: 0.6 * ScreenWidth,
      maxHeight: 200,
      flex: 1,
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text type="header">{text}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 0.4 * ScreenWidth,
          marginVertical: 0.08 * ScreenHeight,
          justifyContent: 'space-between',
        }}
      >
        <Button
          background="GreenForms"
          onPress={() => handleSubmit()}
          text={confirmBtnText}
        />
        <Button
          background="Cancel"
          onPress={() => handleCancel()}
          text="Cancel"
        />
      </View>
    </View>
  );
};
