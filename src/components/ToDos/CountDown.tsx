import { View, Text } from 'react-native';
// import { setInterval, clearInterval } from 'timers';
import { useEffect, useState } from 'react';

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
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

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
        console.log('Countdown complete!');
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
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Render the countdown timer
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text>{countdown.days}D</Text>
      <Text>{countdown.hours}H</Text>
      <Text>{countdown.minutes}M</Text>
      <Text>{countdown.seconds}S</Text>
    </View>
  );
}
