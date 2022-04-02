export const timeConverter = (time) => {
  const convertedTime = new Date(time);

  return `${convertedTime.getDate()}/${convertedTime.getMonth() + 1}/${convertedTime.getFullYear()} ${convertedTime.getHours()}:${convertedTime.getMinutes()}`
}
