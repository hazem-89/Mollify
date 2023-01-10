import { StyleSheet, Text, View } from 'react-native';
import React, { ReactElement, useState } from 'react';
import { useTasks } from '../../util/Context/TaskContext';
import Button from '../buttons/Buttons';
type ConfirmProps = {
  text: string;
  taskId: string;
  confirmBtnText: string;
  onClose?: () => void;
};
export const Confirm = ({
  text,
  taskId,
  confirmBtnText,
  onClose,
}: ConfirmProps) => {
  const { deleteProfileTasks } = useTasks();
  const handleSubmit = () => {
    deleteProfileTasks(taskId);
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
      marginTop: 50,
      minWidth: 400,
      minHeight: 200,
      flex: 1,
      // position: 'relative',
    },
  });
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          width: 400,
          justifyContent: 'center',
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
