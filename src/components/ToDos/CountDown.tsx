import { View, StyleSheet } from 'react-native';
// import { setInterval, clearInterval } from 'timers';
import { useEffect, useState } from 'react';
import { Text } from '../Text';
import { useDimensions } from '@react-native-community/hooks';

type CounterProps = {
  date: Date;
};
export function CountdownTimer({ date }: CounterProps) {
  // Set the start date and the end date
  const startDate = new Date();
  const endDate = date;

  // Calculate the difference in milliseconds between the two dates
  const diff = endDate.getTime() - startDate.getTime();

  // Calculate the number of days, hours, minutes, and seconds between the two dates
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)).toString();
  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  ).toString();
  const minutes = Math.floor(
    (diff % (1000 * 60 * 60)) / (1000 * 60),
  ).toString();
  const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString();

  // Initialize the countdown timer
  const [countdown, setCountdown] = useState({
    days,
    hours,
    minutes,
    seconds,
  });

  useEffect(() => {
    // Update the countdown every second
    const interval = setInterval(() => {
      // Recalculate the difference in milliseconds between the two dates
      const diff = endDate.getTime() - new Date().getTime();

      // If the difference is less than or equal to 0, stop the countdown
      if (diff <= 0) {
        setCountdown({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        });
        clearInterval(interval);
        return;
      }

      // Calculate the number of days, hours, minutes, and seconds left
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      // Update the countdown
      setCountdown({
        // Add 0 when the date {days, hours, minutes, seconds} less than 10
        days: days < 10 ? '0' + days : days.toString(),
        hours: hours < 10 ? '0' + hours : hours.toString(),
        minutes: minutes < 10 ? '0' + minutes : minutes.toString(),
        seconds: seconds < 10 ? '0' + seconds : seconds.toString(),
      });
    }, 1000);
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [date]);

  const DateText =
    countdown.days + ':' + countdown.hours + ':' + countdown.minutes;
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const styles = StyleSheet.create({
    Container: {
      minWidth: smallScreen ? 150 : 150,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    Views: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      minWidth: smallScreen ? 100 : 100,
      alignItems: 'center',
    },
  });
  // Render the countdown timer
  return (
    <View style={styles.Container}>
      <View style={styles.Views}>
        <Text type="CountDownDays">D</Text>
        <Text type="CountDownDays">H</Text>
        <Text type="CountDownDays">M</Text>
        {/* <Text type="CountDownDays">S</Text> */}
      </View>
      <View style={styles.Views}>
        <Text type="DigitalNum">{DateText}</Text>
      </View>
    </View>
  );
}
