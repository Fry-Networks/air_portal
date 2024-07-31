import { submitAwairKey } from "@/app/server/Awair";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";
import Button from "../Button";
interface SubmitAwairKeyButtonProps {
  token: string;
  deviceId: string;
  minerKey: string;
  updateMessage: (message: string) => void;
  disappearInput: (flag: boolean) => void;
}
const SubmitAwairKeyButton: React.FC<SubmitAwairKeyButtonProps> = ({
  token,
  deviceId,
  minerKey,
  updateMessage,
  disappearInput,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { activeAddress } = useWallet();

  const isValidToken = /[A-Za-z0-9._-]{108}/i.test(token);
  const isValidDevice = /[0-9]{5}$/i.test(deviceId);
  const isValidMiner = /^([A-Z]{2,6})-[A-Z0-9]{32}$/i.test(minerKey);
  const isValidKeys = isValidToken && isValidDevice && isValidMiner;
  

  const handleAwairKeySubmit = async () => {
    setIsLoading(true);
    disappearInput(true);
    updateMessage("Submitting Key...");

    try {
      const matchId = deviceId.match(/([0-9]{5})/g);
      if (!matchId) {
        throw new Error("Invalid device ID");
      }

      const response = await submitAwairKey(token, matchId[0], minerKey, activeAddress!);
      updateMessage(response.message);
    } catch (error) {
      console.error("Error submitting Awair key:", error);
      updateMessage("Error submitting Awair key.");
    } finally {
      setIsLoading(false);
      disappearInput(false);
    }
  };

  return (
    <Button
        onClick={handleAwairKeySubmit}
        isValid={isValidKeys}
        isLoading={isLoading}
        text="Submit Awair Key"
        loadingText="Submitting..."
      />
  );
};

export default SubmitAwairKeyButton;
