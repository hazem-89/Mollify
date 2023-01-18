import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useDataContext } from '../../util/context/DataContext';
import Button from '../buttons/Buttons';
import { Text } from '../Text';

type ConfirmProps = {
  text: string;
  taskId?: string;
  confirmBtnText: string;
  funName?: string;
  onClose?: () => void;
  markTaskDone?: (a: string) => void;
  UpdateReqStatus?: (a: string) => void;
  rewardId?: string;
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
}: ConfirmProps) => {
  const { deleteDocFromFS } = useDataContext();

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
      // marginTop: 50,
      width: 0.6 * ScreenWidth,
      // minWidth: 400,
      maxHeight: 200,
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'space-between',
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
