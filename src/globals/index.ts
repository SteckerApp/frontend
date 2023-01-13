interface Window{
  safeLog:(...msg: any[]) => void;
  playStackNotificationSound: () => void;
  recordSparkAudio: () => any;
  getBOrWFomStarkColor: (color:string) => string;
}

/* 
 A simple environment aware logger to help maintain console sanity given a bi-context for execution: production or non-production context
*/
window.safeLog = (...msg: any[])=>{
    if(process.env.NODE_ENV == "production") return
    console.log(...msg)
}
window.playStackNotificationSound = () => {
    console.log(window.location.origin+'/audio/notification.mpeg')
    const audio = new Audio(window.location.origin+'/audio/notification.mpeg')
    audio.play()
}
window.getBOrWFomStarkColor = (color:string) =>{
  if (!color) { return ''; }
  return (parseInt(color.replace('#', '').substring(0,6), 16) > 0xffffff / 2) ? '#000' : '#fff';
}

/* 
How to use
(async () => {
  const recorder = await recordSparkAudio();
  recorder.start();

  setTimeout(async () => {
    const audio = await recorder.stop();
    audio.play();
  }, 3000);
})(); 
*/

  window.recordSparkAudio = () => {
    return new Promise(resolve => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          const audioChunks: BlobPart[] = [];
  
          mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
          });
  
          const start = () => {
            mediaRecorder.start();
          };
  
          const stop = () => {
            return new Promise(resolve => {
              mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                const play = () => {
                  audio.play();
                };
  
                resolve({ audioBlob, audioUrl, play });
              });
  
              mediaRecorder.stop();
            });
          };
  
          resolve({ start, stop });
        });
    });
  };