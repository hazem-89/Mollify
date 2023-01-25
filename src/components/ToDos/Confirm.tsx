import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useDataContext } from '../../util/context/DataContext';
import Button from '../buttons/Buttons';
import { Text } from '../Text';
import { useNavigation } from '@react-navigation/native';
import { useLogin } from '../../util/auth';
import { DocumentData } from 'firebase/firestore';

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
  } = useDataContext();
  const { currentUser, deleteAccount, logout } = useLogin();

  /**
   *  handel confirm delete and update fpr both tasks and reward
   */
  const handleSubmit = () => {
    if (funName === 'delete' && taskId) {
      deleteDocFromFS('Tasks', taskId);
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
        retrieveFSData('Tasks', 'profileId', `${selectedChild.id}`).then(
          (data: any) => {
            if (data) setTasks(data);
          },
        );
      }
      // chilled request when th task is done
    } else if (funName === 'updateRequest') {
      if (UpdateReqStatus) {
        UpdateReqStatus(funName);
        retrieveFSData('Tasks', 'profileId', `${loggedInProfile?.id}`).then(
          (data: any) => {
            if (data) setTasks(data);
          },
        );
      }
    } else if (funName === 'delete' && rewardId) {
      deleteDocFromFS('Rewards', rewardId);
      retrieveFSData('Rewards', 'profileId', `${selectedChild.id}`).then(
        (data: any) => {
          data ? setRewards(data) : setRewards([]);
        },
      ),
        // @ts-ignore
        navigation.navigate('StartScreen');
    } else if (funName === 'delete' && accountId) {
      deleteDocFromFS('users', accountId);
      deleteAccount();
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
