import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AddTodoForm } from '../forms/AddTodoForm';

export const AddActivityTask = () => {
  return (
    <View>
      <AddTodoForm category="Add Activity Task" />
    </View>
  );
};
