import React, { ReactElement, useEffect, useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet } from 'react-native';
import DisplayTasksBackGround from '../../assets/images/DisplayTasksBackGround.png';
import { CreateProfileForm } from '../components/forms/CreateProfile';
import Scoreboard from '../components/Scoreboard/Scoreboard';
import { DisplayTasksCategories } from '../components/ToDos/DisplayTasksCategories';
import { useDataContext } from '../util/context/DataContext';

const DisplayMenusScreen = ({ route }: any) => {
  const [component, setComponent] = useState<ReactElement>();

  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const content = route.params.paramKey.content;
  const { profiles } = useDataContext();

  useEffect(() => {
    const test = () => {
      if (content === 'DisplayTasks') setComponent(<DisplayTasksCategories />);
      if (content === 'DisplayRewards') setComponent(<Scoreboard />);
      if (content === 'CreateProfile')
        setComponent(<CreateProfileForm profilesExist={!!profiles} />);
      if (content === 'UpdateProfile')
        setComponent(
          <CreateProfileForm
            profilesExist={!!profiles}
            profile={route.params.paramKey.profile}
          />,
        );
    };
    test();
  }, []);

  const styles = StyleSheet.create({
    Background: {
      position: 'relative',
      overflowX: 'scroll',
      height: ScreenHeight,
      width: ScreenWidth,
      flex: 1,
      resizeMode: 'stretch',
    },
    SafeArea: {
      overflow: 'hidden',
      position: 'absolute',
      width: ScreenWidth,
      maxWidth: ScreenWidth,
      maxHeight: ScreenHeight,
      height: ScreenHeight,
      display: 'flex',
      alignItems: 'center',
      zIndex: 1,
    },
  });

  return (
    <>
      <Image source={DisplayTasksBackGround} style={styles.Background} />
      <SafeAreaView style={styles.SafeArea}>{component}</SafeAreaView>
    </>
  );
};

export default DisplayMenusScreen;

