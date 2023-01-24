import React, { useEffect, useState } from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDataContext } from '../../util/context/DataContext';

type OnboardingProps = {
  guide: string;
};

export default function Onboarding({ guide }: OnboardingProps) {
  const ScreenHeight = Dimensions.get('window').height;
  const ScreenWidth = Dimensions.get('window').width;
  const [open, setOpen] = useState(false);
  const { onboardingComplete, setOnboardingComplete, setAsyncData } =
    useDataContext();
  // Each guide needs to have a state for wether it has been completed or not.

  useEffect(() => {
    renderGuide();
  }, []);

  useEffect(() => {
    console.log('onboarding state', onboardingComplete);
    console.log('guide', guide);
  }, [guide, onboardingComplete]);

  function renderGuide() {
    /* Guides needed:
      1. Roomscreen, drag and drop explanation (Child)
      2. RoomScreen menu (Parent & child)
      3. Tasks: add, remove and approve (Parent)
      4. Rewards: add, remove and approve (Parent)
      5. Tasks: mark as done (Child)
      6. Rewards: Explain points etc.
    */
    switch (guide) {
      // set the guide to be rendered
      case '':
        break;
      default:
        break;
    }
  }

  const styles = StyleSheet.create({
    button: {
      width: 100,
      height: 50,
    },
    background: {
      position: 'absolute',
      zIndex: 100,
      width: ScreenWidth,
      height: ScreenHeight,
      backgroundColor: 'linear-gradient(to bottom right, rgba(0,0,0,0.7))',
    },
  });

  function handlePress() {
    console.log('press', onboardingComplete);
    const updatedOnboarding = onboardingComplete;
    // fix ts error
    // @ts-ignore
    updatedOnboarding[guide] = true;
    setOnboardingComplete(updatedOnboarding);
    setAsyncData('onboardingComplete', updatedOnboarding);
    setOpen(false);
  }

  function handleDisableAll() {
    // disable all guides by setting state to true indicating that they have been viewed.
    const updatedOnboarding = { ...onboardingComplete };
    Object.keys(updatedOnboarding).forEach(key => {
      // fix ts error
      // @ts-ignore
      updatedOnboarding[key] = true;
    });
    setOnboardingComplete(updatedOnboarding);
    console.log('disabled guides');
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <>
      {open ? (
        <TouchableOpacity
          onPress={() => handlePress()}
          activeOpacity={1}
          style={styles.background}
        >
          <View style={styles.button}>
            <Button
              title="Disable all guides"
              onPress={() => handleDisableAll()}
            />
          </View>
        </TouchableOpacity>
      ) : (
        // replace this with a question mark button to indicate you can open a guide.
        <View style={styles.button}>
          <Button title="Open guide" onPress={() => handleOpen()} />
        </View>
      )}
    </>
  );
}
