import { useState } from "react";
import Modal from "react-modal";
import SensecapInput from "../Inputs/SensecapInput";
import SubmitSensecapKeyButton from "../SubmitButtons/SubmitSensecap";
import Typography from "../Typography";

interface SensecapModalProps {
  isOpen: boolean;
  setOpen: Function;
}

export const SensecapModal: React.FC<SensecapModalProps> = ({
  isOpen,
  setOpen,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [deviceId, setDeviceId] = useState<string>("");
  const [message, updateMessage] = useState({ message: "", color: "white" });
  const [disappear, setDisappear] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpen(false);
    setUsername("");
    setPassword("");
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
        <Typography className="mb-3" variant="title">Please enter Sensecap credentials below:</Typography>
        <SensecapInput
          token={deviceId}
          setToken={setDeviceId}
          inputType="id"
          placeholder="Enter Device Id"
        />
        <SensecapInput
          token={username}
          setToken={setUsername}
          inputType="server"
          placeholder="Enter API ID"
        />
        <SensecapInput
          token={password}
          setToken={setPassword}
          inputType="id"
          placeholder="Enter API KEY"
        />
        <SubmitSensecapKeyButton
          updateMessage={updateMessage}
          username={username}
          password={password}
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
