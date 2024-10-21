import { submitAwairKey } from "@/app/server/Awair";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";
import Button from "../Button";
interface SubmitAwairKeyButtonProps {
  token: string;
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
const SubmitAwairKeyButton: React.FC<SubmitAwairKeyButtonProps> = ({
  token,
  deviceId,
  updateMessage,
  disappearInput,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { activeAddress } = useWallet();

  const isValidToken = /[A-Za-z0-9._-]{108}/i.test(token);
  const isValidDevice = /[0-9]{5}$/i.test(deviceId);
  const isValidKeys = isValidToken && isValidDevice;
  

  const handleAwairKeySubmit = async () => {
    setIsLoading(true);
    disappearInput(true);
    updateMessage({ message: "Submitting Key...", color: "white" });

    try {
      const matchId = deviceId.match(/([0-9]{5})/g);
      if (!matchId) {
        throw new Error("Invalid device ID");
      }

      const response = await submitAwairKey(token, matchId[0], activeAddress!);
      updateMessage(response.data);
    } catch (error) {
      console.error("Error submitting Awair key:", error);
      updateMessage({ message: "Error submitting Awair key.", color: "white" });
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
