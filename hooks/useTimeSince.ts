import { useEffect, useState } from 'react';

type TimeSince = {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  months: number;
  years: number;
  formatted: string;
};

export function useTimeSince(date: Date | string | number): TimeSince {
  const [timeSince, setTimeSince] = useState<TimeSince>(() => calculateDiff(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSince(calculateDiff(date));
    }, 1000); // atualiza a cada segundo

    return () => clearInterval(interval);
  }, [date]);

  return timeSince;
}

function calculateDiff(date: Date | string | number): TimeSince {
  const created = new Date(date).getTime();
  const now = Date.now();

  const diffMs = Math.max(0, now - created);
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(days / 365.25);

  const formatted = getFormattedTime({ seconds, minutes, hours, days, months, years });

  return {
    seconds,
    minutes,
    hours,
    days,
    months,
    years,
    formatted,
  };
}

function getFormattedTime(time: Omit<TimeSince, 'formatted'>): string {
  const {
    seconds, minutes, hours, days, months, years
  } = time;

  if (seconds < 60) {
    return `${seconds} segundo${seconds !== 1 ? 's' : ''} atrás`;
  } else if (minutes < 60) {
    return `${minutes} minuto${minutes !== 1 ? 's' : ''} atrás`;
  } else if (hours < 24) {
    return `${hours} hora${hours !== 1 ? 's' : ''} atrás`;
  } else if (days < 30.44) {
    return `${days} dia${days !== 1 ? 's' : ''} atrás`;
  } else if (months < 12) {
    return `${months} mese${months !== 1 ? 's' : ''} atrás`;
  } else {
    return `${years} ano${years !== 1 ? 's' : ''} atrás`;
  }
}