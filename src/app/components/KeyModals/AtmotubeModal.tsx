import { useState } from "react";
import Modal from "react-modal";
import AtmotubeInput from "../Inputs/AtmotubeInput";
import SubmitAtmotubeKeyButton from "../SubmitButtons/SubmitAtmotube";
import Typography from "../Typography";

interface AtmotubeModalProps {
  isOpen: boolean;
  setOpen: Function;
}

export const AtmotubeModal: React.FC<AtmotubeModalProps> = ({
  isOpen,
  setOpen,
}) => {
  const [token, setToken] = useState<string>("");
  const [deviceId, setDeviceId] = useState<string>("");
  const [message, updateMessage] = useState({ message: "", color: "white" });
  const [disappear, setDisappear] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpen(false);
    setToken("");
    setDeviceId("");
    updateMessage({ message: "", color: "white" });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className="bg-[#0CA7E5] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-4 w-auto sm:w-[600px] rounded-[10px]"
      overlayClassName="fixed inset-0 bg-black/20"
    >
      <div className="flex justify-end">
        <button
          className="text-[20px] rounded-[50%] border-white"
          onClick={handleCloseModal}
        >
          X
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Typography>Please enter Atmotube credentials below:</Typography>
        <AtmotubeInput
          token={deviceId}
          setToken={setDeviceId}
          inputType="id"
          placeholder="Device MAC Address"
        />
        <AtmotubeInput
          token={token}
          setToken={setToken}
          inputType="auth"
          placeholder="Enter API Key"
        />

        <SubmitAtmotubeKeyButton
          updateMessage={updateMessage}
          token={token}
          deviceId={deviceId}
          disappearInput={setDisappear}
        />

        <Typography variant="p" className={'text-white text-center mt-10 font-bold'}>
        {message.message}
        </Typography>
      </div>
    </Modal>
  );
}
