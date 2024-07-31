import { submitAtmotubeKey } from "@/app/server/Atmotube";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";
import Button from "../Button";
interface SubmitAtmotubeKeyButtonProps {
  token: string;
  deviceId: string;
  minerKey: string;
  updateMessage: ({
    message,
    color,
  }: {
    message: string;
    color: string;
  }) => void;
  disappearInput: (flag: boolean) => void;
}

const SubmitAtmotubeKeyButton: React.FC<SubmitAtmotubeKeyButtonProps> = ({
  token,
  deviceId,
  minerKey,
  updateMessage,
  disappearInput,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { activeAddress } = useWallet();

  const isValidToken = /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/i.test(token);
  const isValidDevice = /^([0-9A-Za-z]{2}:){5}[0-9A-Za-z]{2}$/i.test(deviceId);
  const isValidMiner = /^([A-Z]{2,6})-[A-Z0-9]{32}$/i.test(minerKey);
  const isValidKeys = isValidToken && isValidDevice && isValidMiner;

  const handleAtmotubeKeySubmit = async () => {
    setIsLoading(true);
    disappearInput(true);
    updateMessage({ message: "Submitting Key...", color: "white" });

    try {
      const response = await submitAtmotubeKey(token, deviceId, minerKey, activeAddress!);
      updateMessage(response.data);
    } catch (error) {
      console.error("Error submitting Atmotube key:", error);
      updateMessage({message:"Error submitting Atmotube key",color:""});
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
