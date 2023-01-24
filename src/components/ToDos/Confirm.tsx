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
  const { deleteDocFromFS, retrieveFSData, setProfiles } = useDataContext();
  const navigation = useNavigation();
  const { currentUser, logout, deleteAccount } = useLogin();

  const handleSubmit = () => {
    if (funName === 'delete' && taskId) {
      deleteDocFromFS('Tasks', taskId);
    } else if (funName === 'updateTaskDone') {
      if (markTaskDone) {
        markTaskDone(funName);
      }
    } else if (funName === 'updateRequest') {
      if (UpdateReqStatus) {
        UpdateReqStatus(funName);
      }
    } else if (funName === 'delete' && rewardId) {
      deleteDocFromFS('Rewards', rewardId);
    } else if (funName === 'delete' && profileId) {
      deleteDocFromFS('profiles', profileId);
      retrieveFSData('profiles', 'mainUserId', `${currentUser?.uid}`).then(
        (data: DocumentData[]) => {
          data ? setProfiles(data) : setProfiles(undefined);
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

