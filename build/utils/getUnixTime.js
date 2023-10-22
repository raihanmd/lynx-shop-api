export default function getUnixTime() {
    return Math.floor(new Date().getTime() / 1000);
}
