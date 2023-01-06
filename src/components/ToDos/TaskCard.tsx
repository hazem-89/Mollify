import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tasks } from '../../Interfaces';

interface Props {
  task: Tasks;
}

const TaskCard = ({ task }: Props) => {
  return (
    <View>
      <Text>{task.taskTitle}</Text>
      <Text>{task.taskDescription}</Text>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({});
