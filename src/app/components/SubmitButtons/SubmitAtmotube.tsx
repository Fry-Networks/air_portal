import { submitAtmotubeKey } from "@/app/server/Atmotube";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";

export function SubmitAtmotubeKeyButton({
  token,
  deviceId,
  updateMessage,
  disappearInput,
}: {
  token: string;
  deviceId: string;
  updateMessage: (message: string) => void;
  disappearInput: (flag: boolean) => void;
}) {
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
      const response = await submitAtmotubeKey(token,deviceId,activeAddress! );

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
    <button
      onClick={handleAtmotubeKeySubmit}
      className={`py-4 px-6 text-base font-medium rounded-lg focus:outline-none ${
        isValidKeys ? "bg-[#00FFFF] cursor-pointer" : "bg-gray-400 cursor-not-allowed"
      }`}
      disabled={!isValidKeys}
    >
      {isLoading ? "Submitting..." : "Submit Atmotube Key"}
    </button>
  );
}
