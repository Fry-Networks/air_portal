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
        isLoading ? "bg-gray-400 cursor-wait" : "bg-[#00FFFF] hover:bg-cyan-700"
      }`}
      disabled={isLoading}
    >
      {isLoading ? "Submitting..." : "Submit Atmotube Key"}
    </button>
  );
}
