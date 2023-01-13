export {}
declare global {
  interface Window {
    safeLog: (...msg: any[]) => void
    playStackNotificationSound: () => void;
    recordSparkAudio: () => any;
    getBOrWFomStarkColor: (color:string) => string;
  }
  let safeLog: (...msg: any[]) => void
  let playStackNotificationSound: () => void;
  let recordSparkAudio: () => any;
  let getBOrWFomStarkColor: (color:string) => string;
}
