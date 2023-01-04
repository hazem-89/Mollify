import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AddTodoForm } from '../forms/AddTodoForm';

export const AddSchoolTask = () => {
  return (
    <View>
      <AddTodoForm category="Add School assignment" />
    </View>
  );
};

const styles = StyleSheet.create({});
