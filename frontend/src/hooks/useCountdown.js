import { useEffect, useState } from 'react';

export function useCountdown(timeDuration = 1) {
  // initialize state — hr starts at timeDuration, min and sec at 0
  const [timeLeft, setTimeLeft] = useState({
    hr: timeDuration,
    min: 0,
    sec: 0,
  });

  useEffect(
    function () {
      // get current time in ms
      const currentTime_ms = Date.now();

      // convert timeDuration (hrs) to ms 
      const timeDuration_ms = timeDuration * 60 * 60 * 1000;

      // fixed point in the future — think: "3hrs from right now"
      const countdownEndTime_ms = currentTime_ms + timeDuration_ms;

      function updateTimeLeft() {
        // ms between now and the termination point, floors at 0 — never goes negative
        const milliSecondsRemaining = Math.max(
          0,
          countdownEndTime_ms - Date.now(),
        );

        const hoursLeft = Math.floor(milliSecondsRemaining / (1000 * 60 * 60));

        // modulus i.e. % 60 keeps it between 0-59
        const minutesLeft = Math.floor(
          (milliSecondsRemaining / (1000 * 60)) % 60,
        );

        // modulus i.e. % 60 keeps it between 0-59
        const secondsLeft = Math.floor((milliSecondsRemaining / 1000) % 60);

        // update state → triggers re-render with new values
        setTimeLeft({ hr: hoursLeft, min: minutesLeft, sec: secondsLeft });
      }

      // run once immediately so UI doesn't lag on first render
      updateTimeLeft();

      // then repeat every second
      const timerId = setInterval(updateTimeLeft, 1000);

      // cleanup — cancels interval when component unmounts or timeDuration changes
      return () => clearInterval(timerId);
    },
    [timeDuration], // re-runs if timeDuration changes
  );

  // return the live time values to whatever component uses this hook
  return timeLeft;
}
