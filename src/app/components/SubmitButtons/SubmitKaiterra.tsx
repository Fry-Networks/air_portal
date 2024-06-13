import { submitKaiterraKey } from "@/app/server/Kaiterra";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";
import Button from "../Button";
interface SubmitKaiterraKeyButtonProps {
  token: string;
  deviceId: string;
  updateMessage: (message: string) => void;
  disappearInput: (flag: boolean) => void;
}

const SubmitKaiterraKeyButton: React.FC<SubmitKaiterraKeyButtonProps> = ({
  token,
  deviceId,
  updateMessage,
  disappearInput,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { activeAddress } = useWallet();

  const isValidToken = /[A-Za-z0-9]{48}$/i.test(token);
  const isValidDevice = /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/i.test(deviceId);
  const isValidKeys = isValidToken && isValidDevice;

  const handleKaiterraKeySubmit = async () => {
    setIsLoading(true);
    disappearInput(true);
    updateMessage("Submitting Key...");

    try {
      const response = await submitKaiterraKey(token, deviceId, activeAddress!);
      updateMessage(response.message);
    } catch (error) {
      console.error("Error submitting Kaiterra key:", error);
      updateMessage("Error submitting Kaiterra key.");
    } finally {
      setIsLoading(false);
      disappearInput(false);
    }
  };

  return (
    <Button
    onClick={handleKaiterraKeySubmit}
    isValid={isValidKeys}
    isLoading={isLoading}
    text="Submit Kaiterra Key"
    loadingText="Submitting..."
  />
  );
};

export default SubmitKaiterraKeyButton;
