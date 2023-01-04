import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AddTodoForm } from '../forms/AddTodoForm';

export const AddCleaningToDo = () => {
  return (
    <View>
      <AddTodoForm category="Add Cleaning Task" />
    </View>
  );
};
