import { submitAtmotubeKey } from "@/app/server/Atmotube";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";
import Button from "../Button";
interface SubmitAtmotubeKeyButtonProps {
  token: string;
  deviceId: string;
  updateMessage: (message: string) => void;
  disappearInput: (flag: boolean) => void;
}

const SubmitAtmotubeKeyButton: React.FC<SubmitAtmotubeKeyButtonProps> = ({
  token,
  deviceId,
  updateMessage,
  disappearInput,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { activeAddress } = useWallet();

  const isValidToken = /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/i.test(token);
  const isValidDevice = /^([0-9A-Za-z]{2}:){5}[0-9A-Za-z]{2}$/i.test(deviceId);
  const isValidKeys = isValidToken && isValidDevice;

  const handleAtmotubeKeySubmit = async () => {
    setIsLoading(true);
    disappearInput(true);
    updateMessage("Submitting Key...");

    try {
      const response = await submitAtmotubeKey(token, deviceId, activeAddress!);
      updateMessage(response.message);
    } catch (error) {
      console.error("Error submitting Atmotube key:", error);
      updateMessage("Error submitting Atmotube key.");
    } finally {
      setIsLoading(false);
      disappearInput(false);
    }
  };

  return (
    <Button
        onClick={handleAtmotubeKeySubmit}
        isValid={isValidKeys}
        isLoading={isLoading}
        text="Submit Atmotube Key"
        loadingText="Submitting..."
      />
  );
};

export default SubmitAtmotubeKeyButton;
