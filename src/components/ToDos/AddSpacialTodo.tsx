import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AddTodoForm } from '../forms/AddTodoForm';

export const AddSpacialTodo = () => {
  return (
    <View>
      <AddTodoForm category="Add Spacial Task" />
    </View>
  );
};
