import { submitKaiterraKey } from "@/app/server/Kaiterra";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";

export function SubmitKaiterraKeyButton({
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


  const handleKaiterraKeySubmit = async () => {
    setIsLoading(true);
    disappearInput(true);
    updateMessage("Submitting Key...");

    try {
      const response = await submitKaiterraKey(token,deviceId,activeAddress! );

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
    <button
      onClick={handleKaiterraKeySubmit}
      className={`py-4 px-6 text-base font-medium rounded-lg focus:outline-none ${
        isLoading ? "bg-gray-400 cursor-wait" : "bg-[#00FFFF] hover:bg-cyan-700"
      }`}
      disabled={isLoading}
    >
      {isLoading ? "Submitting..." : "Submit Kaiterra Key"}
    </button>
  );
}
