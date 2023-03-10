//This function will convert minutes into hours,minutes and seconds.
function convertMinutesToTime(mins: number): { hours: number, minutes: number, seconds: number } {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  const seconds = Math.floor((mins - (hours * 60) - minutes) * 60);
  return { hours, minutes, seconds };
}
