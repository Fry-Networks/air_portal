import { submitNrfKey } from "@/app/server/Nrf";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";

export function SubmitNrfKeyButton({
  token,
  deviceId,
  updateMessage,
  disappearInput,
}: {
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
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { activeAddress } = useWallet();

  const isValidToken = /[A-Za-z0-9]{40}$/i.test(token);
  const isValidDevice = /nrf-\d{15}$/i.test(deviceId);
  const isValidKeys = isValidToken && isValidDevice;


  const handleNrfKeySubmit = async () => {
    setIsLoading(true);
    disappearInput(true);
    updateMessage({ message: "Submitting Key...", color: "white" });

    try {
      const payload ={token,deviceId,activeAddress}
      console.log({payload})

      const response = await submitNrfKey(token,deviceId,activeAddress! );
      //@ts-ignore
      updateMessage(response?.data);
    } catch (error) {
      console.error("Error submitting Nrf key:", error);

      updateMessage({
        message: "Error submitting API key.",
        color: "red",
      });
    } finally {
      setIsLoading(false);
      disappearInput(false);
    }
  };

  return (
    <button
      onClick={handleNrfKeySubmit}
      className={`py-4 px-6 text-base font-medium rounded-lg focus:outline-none ${
        isValidKeys ? "bg-[#00FFFF] cursor-pointer" : "bg-gray-400 cursor-not-allowed"
      }`}
      disabled={!isValidKeys}
    >
      {isLoading ? "Submitting..." : "Submit Nrf Key"}
    </button>
  );
}
