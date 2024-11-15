import { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
/**
 * @param onIdle - function to notify user when idle timeout is close
 * @param idleTime - number of seconds to wait before user is logged out
 */
interface IdleProps {
  onIdle: () => void;
  onPrompt: () => void;
  idleTime: number;
}

const useIdleTimeout = (params: IdleProps) => {
  const { onIdle, idleTime = 1, onPrompt } = params;
  const idleTimeout = 1000 * idleTime;
  const [isIdle, setIdle] = useState(false);
  const handlePrompt = () => {
    onPrompt();
    setIdle(true);
  };

  const handleIdle = () => {
    onIdle();
    setIdle(false);
  };
  const idleTimer = useIdleTimer({
    timeout: idleTimeout,
    promptBeforeIdle: idleTimeout / 2,
    onPrompt: handlePrompt,
    onIdle: handleIdle,
    debounce: 5,
    stopOnIdle: true,
  });
  return {
    isIdle,
    setIdle,
    idleTimer,
  };
};
export default useIdleTimeout;
