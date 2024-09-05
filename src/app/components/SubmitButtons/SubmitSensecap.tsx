import { SensecapKey } from "@/app/server/Sensecap";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";
import Button from "../Button";

interface SubmitSensecapKeyButtonProps {
  username: string;
  password: string;
  deviceId: string;
  updateMessage: ({
    message,
    color,
  }: {
    message: string;
    color: string;
  }) => void;
  disappearInput: (flag: boolean) => void;
}
const SubmitSensecapKeyButton: React.FC<SubmitSensecapKeyButtonProps> = ({
  username,
  password,
  deviceId,
  updateMessage,
  disappearInput,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { activeAddress } = useWallet();

  const isValidUsername = /^[A-Z0-9]{16}$/i.test(username);
  const isValidPassword = /^[0-9A-Fa-f]{64}$/i.test(password);
  const isValidDevice = /^[0-9A-Fa-f]{16}$/i.test(deviceId);

  const isValidKeys = isValidUsername && isValidPassword && isValidDevice;

  const handleSensecapKeySubmit = async () => {
    setIsLoading(true);
    disappearInput(true);
    updateMessage({ message: "Submitting Key...", color: "white" });

    try {
      const response = await SensecapKey(username,password, deviceId, activeAddress!);
      updateMessage(response.data);
    } catch (error) {
      console.error("Error submitting Awair key:", error);
    } finally {
      setIsLoading(false);
      disappearInput(false);
    }
  };

  return (
    <Button
        onClick={handleSensecapKeySubmit}
        // isValid={true}
        isValid={isValidKeys}
        isLoading={isLoading}
        text="Submit Sensecap Key"
        loadingText="Submitting..."
      />
  );
};

export default SubmitSensecapKeyButton;
