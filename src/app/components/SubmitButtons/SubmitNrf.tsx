import { submitNrfKey } from "@/app/server/Nrf";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";
import Button from "../Button";
interface SubmitNrfKeyButtonProps {
  token: string;
  deviceId: string;
  updateMessage: (message: string) => void;
  disappearInput: (flag: boolean) => void;
}

const SubmitNrfKeyButton: React.FC<SubmitNrfKeyButtonProps> = ({
  token,
  deviceId,
  updateMessage,
  disappearInput,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { activeAddress } = useWallet();

  const isValidToken = /[A-Za-z0-9]{40}$/i.test(token);
  const isValidDevice = /nrf-\d{15}$/i.test(deviceId);
  const isValidKeys = isValidToken && isValidDevice;

  const handleNrfKeySubmit = async () => {
    setIsLoading(true);
    disappearInput(true);
    updateMessage("Submitting Key...");

    try {
      const payload = { token, deviceId, activeAddress };
      console.log({ payload });

      const response = await submitNrfKey(token, deviceId, activeAddress!);
      updateMessage(response?.message);
    } catch (error) {
      console.error("Error submitting Nrf key:", error);
      updateMessage("Error submitting Atmotube key.");
    } finally {
      setIsLoading(false);
      disappearInput(false);
    }
  };

  return (
    <Button
    onClick={handleNrfKeySubmit}
    isValid={isValidKeys}
    isLoading={isLoading}
    text="Submit Nrf Key"
    loadingText="Submitting..."
  />
  );
};

export default SubmitNrfKeyButton;
