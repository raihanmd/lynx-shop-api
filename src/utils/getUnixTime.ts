export default function getUnixTime(): number {
  return Math.floor(new Date().getTime() / 1000);
}
