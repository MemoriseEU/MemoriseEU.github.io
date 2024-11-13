import { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
/**
 * @param onIdle - function to notify user when idle timeout is close
 * @param idleTime - number of seconds to wait before user is logged out
 */
interface IdleProps {
  onIdle: () => void;
  idleTime: number;
}

const useIdleTimeout = (params: IdleProps) => {
  const { onIdle, idleTime = 1 } = params;
  const idleTimeout = 1000 * idleTime;
  const [isIdle, setIdle] = useState(false);
  const handleIdle = () => {
    setIdle(true);
  };
  const idleTimer = useIdleTimer({
    timeout: idleTimeout,
    promptTimeout: idleTimeout / 2,
    onPrompt: onIdle,
    onIdle: handleIdle,
    debounce: 500,
  });
  return {
    isIdle,
    setIdle,
    idleTimer,
  };
};
export default useIdleTimeout;
