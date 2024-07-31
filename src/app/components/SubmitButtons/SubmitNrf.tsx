import { submitNrfKey } from "@/app/server/Nrf";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";
import Button from "../Button";
interface SubmitNrfKeyButtonProps {
  token: string;
  deviceId: string;
  minerKey: string;
  updateMessage: (message: string) => void;
  disappearInput: (flag: boolean) => void;
}

const SubmitNrfKeyButton: React.FC<SubmitNrfKeyButtonProps> = ({
  token,
  deviceId,
  minerKey,
  updateMessage,
  disappearInput,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { activeAddress } = useWallet();

  const isValidToken = /^[A-Za-z0-9]{40}$/i.test(token);
  const isValidDevice = /nrf-\d{15}$/i.test(deviceId);
  const isValidMiner = /^([A-Z]{2,6})-[A-Z0-9]{32}$/i.test(minerKey);
  const isValidKeys = isValidToken && isValidDevice && isValidMiner;

  const handleNrfKeySubmit = async () => {
    setIsLoading(true);
    disappearInput(true);
    updateMessage("Submitting Key...");

    try {
      const response = await submitNrfKey(token, deviceId, minerKey , activeAddress!);
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
