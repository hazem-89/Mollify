import { StyleSheet, View } from 'react-native';
import React, { ReactElement, useState } from 'react';
import { useTasks } from '../../util/context/TaskContext';
import Button from '../buttons/Buttons';
import { Text } from '../Text';
type ConfirmProps = {
  text: string;
  taskId: string;
  confirmBtnText: string;
  funName?: string;
  onClose?: () => void;
  markTaskDone?: (a: string) => void;
  UpdateReqStatus?: (a: string) => void;
};
export const Confirm = ({
  text,
  taskId,
  confirmBtnText,
  onClose,
  markTaskDone,
  UpdateReqStatus,
  funName,
}: ConfirmProps) => {
  const { deleteProfileTasks } = useTasks();
  const handleSubmit = () => {
    if (funName === 'delete') {
      deleteProfileTasks(taskId);
    } else if (funName === 'updateTaskDone') {
      if (markTaskDone) {
        markTaskDone(funName);
      }
    } else if (funName === 'updateRequest') {
      if (UpdateReqStatus) {
        UpdateReqStatus(funName);
      }
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

  const styles = StyleSheet.create({
    container: {
      // marginTop: 50,
      minWidth: 400,
      maxHeight: 200,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
  return (
    <View style={styles.container}>
      <Text type="text">{text}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 350,
          marginVertical: 30,
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
