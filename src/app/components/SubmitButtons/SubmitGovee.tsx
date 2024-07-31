import { GoveeKey } from "@/app/server/Govee";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";
import Button from "../Button";

interface SubmitGoveeKeyButtonProps {
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
const SubmitGoveeKeyButton: React.FC<SubmitGoveeKeyButtonProps> = ({
  token,
  deviceId,
  minerKey,
  updateMessage,
  disappearInput,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { activeAddress } = useWallet();

  const isValidToken = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/i.test(token);
  const isValidDevice = /^[A-F0-9]{2}(:[A-F0-9]{2}){7}$/i.test(deviceId);
  const isValidMiner = /^([A-Z]{2,6})-[A-Z0-9]{32}$/i.test(minerKey);
  const isValidKeys = isValidToken && isValidDevice && isValidMiner;

  const handleGoveeKeySubmit = async () => {
    setIsLoading(true);
    disappearInput(true);
    updateMessage({ message: "Submitting Key...", color: "white" });

    try {
      const response = await GoveeKey(token, deviceId,minerKey,activeAddress!);
      updateMessage(response.data);
    } catch (error) {
      console.error("Error submitting Govee key:", error);
    } finally {
      setIsLoading(false);
      disappearInput(false);
    }
  };

  return (
    <Button
        onClick={handleGoveeKeySubmit}
        isValid={isValidKeys}
        isLoading={isLoading}
        text="Submit Govee Key"
        loadingText="Submitting..."
      />
  );
};

export default SubmitGoveeKeyButton;
