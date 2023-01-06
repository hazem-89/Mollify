import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTasks } from '../../util/Context/TaskContext';
import { Tasks } from '../../Interfaces';

type TasksCategoryPageProps = {
  category: string;
};
export const TasksCategoryPage = ({ category }: TasksCategoryPageProps) => {
  const { getProfileTasks, profileTasks } = useTasks();
  const [tasks, setTasks] = useState<Tasks>();
  useEffect(() => {
    getProfileTasks();
  }, [category]);

  return (
    <View>
      <Text>{category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
