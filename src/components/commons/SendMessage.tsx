import { Icons } from "@/constants";
import { useRef, useState } from "react";


const SendMessage = () => {
   const [textMessage, setTextMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false); 
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null); 
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null); 
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); 
  const [recordingTime, setRecordingTime] = useState(0); 
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null); 
  const [isPaused, setIsPaused] = useState(false); 
  const [chunks, setChunks] = useState<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null); 

  // Start recording voice message
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new MediaRecorder(stream);

      newRecorder.ondataavailable = (event) => {
        setChunks((prev) => [...prev, event.data]); // Collect chunks
      };

      newRecorder.start();
      setRecorder(newRecorder);
      setIsRecording(true);

      // Start the timer
      const intervalId = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000); // Increment every second
      setTimerId(intervalId);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  // Pause recording
  const pauseRecording = () => {
    if (recorder && isRecording) {
      recorder.stop(); // Stop the recorder temporarily
      setIsPaused(true);
      clearInterval(timerId!); // Pause the timer
    }
  };

  // Resume recording
  const resumeRecording = async () => {
    await startRecording();
    setIsPaused(false);
  };

  // Stop recording and save the audio
  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setIsRecording(false);
      setIsPaused(false);

      // Create audio Blob from chunks
      const completeBlob = new Blob(chunks, { type: "audio/webm" });
      setAudioBlob(completeBlob);
      setAudioURL(URL.createObjectURL(completeBlob));

      // Stop the timer
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
    }
  };

  // Play the recorded audio
  const playAudio = () => {
    if (audioURL && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Pause the recorded audio
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Send the recorded audio (simulate sending)
  const sendAudioMessage = () => {
    if (audioBlob) {
      // Logic to send the audio message to backend or server
      console.log("Audio sent:", audioBlob);
      resetRecording();
    }
  };

  // Cancel the audio message and reset the state
  const cancelRecording = () => {
    resetRecording();
  };

  // Reset the recording state
  const resetRecording = () => {
    setAudioBlob(null);
    setAudioURL(null);
    setIsPlaying(false);
    setChunks([]);
    setRecordingTime(0); // Reset the timer

    // Stop the timer if recording is cancelled
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };


 // Send the text message
 const sendTextMessage = () => {
    if (textMessage.trim()) {
      console.log("Text message sent:", textMessage);
      setTextMessage(""); // Clear the input after sending
    }
  };

  // Convert recording time to mm:ss format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  console.log(audioURL)

  return (
    <div className="flex justify-between items-center border border-gray rounded-lg py-2 px-3 w-full mt-5 lg:-mt-10">
      {!audioBlob && (
        <textarea
          placeholder="Send message..."
          rows={4}
          className="w-full text-12 text-gray font-normal focus:outline-none font-outfit border-none outline-none shadow-none"
        />
      )}

      <section className="flex justify-between items-center w-14 lg:w-20 ml-2">
        {/* Place the audio element at the start */}
       <div>
       {audioBlob && (
         <>
            <audio
                ref={audioRef}
                src={audioURL || undefined}
                onEnded={() => setIsPlaying(false)}
                controls
          />
         </>
        )}
       </div>

        <div className="flex justify-center items-center ml-auto gap-2">
        {isRecording || isPlaying ? null : (
          !audioBlob && (
            <>
              <span aria-description="send">
                <img src={Icons.SendIcon} className="cursor-pointer" />
              </span>
              <span aria-description="attached file">
                <img src={Icons.AttachedIcon} className="cursor-pointer" />
              </span>
            </>
          )
        )}
        {isRecording && (
          <span className="text-red-500 text-sm font-medium">
            {formatTime(recordingTime)}
          </span>
        )}

        {!audioBlob ? (
          <>
            <span aria-description="send voice note" onClick={startRecording}>
              {isRecording ? (
                <Icons.VoiceRecording />
              ) : (
                <img src={Icons.VoiceIcon} className="cursor-pointer" />
              )}
            </span>
            {isRecording && (
              <button
                onClick={stopRecording}
                className="text-author cursor-pointer"
              >
                Stop
              </button>
            )}
            {isRecording && !isPaused && (
              <button
                onClick={pauseRecording}
                className="text-designer cursor-pointer"
              >
                Pause
              </button>
            )}
            {isPaused && (
              <button
                onClick={resumeRecording}
                className="text-designer cursor-pointer"
              >
                Resume
              </button>
            )}
          </>
        ) : (
          <>
            {/* Keep these icons aligned to the right */}
            {!isPlaying ? (
              <Icons.PlayIcon
                size={20}
                onClick={playAudio}
                className="cursor-pointer text-primary"
              />
            ) : (
              <Icons.PauseIcon
                size={20}
                onClick={pauseAudio}
                className="cursor-pointer text-primary"
              />
            )}
            <Icons.CancelIcon
              size={20}
              onClick={cancelRecording}
              className="cursor-pointer text-error"
            />
            <span
              aria-description="send"
              onClick={audioBlob ? sendAudioMessage : sendTextMessage}
            >
              <img src={Icons.SendIcon} className="cursor-pointer" />
            </span>
          </>
        )}
        </div>
      </section>
    </div>
  );
};

export default SendMessage;
