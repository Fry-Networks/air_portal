import { useState } from "react";
import Modal from "react-modal";
import NrfInput from "../Inputs/NrfInput";
import SubmitNrfKeyButton from "../SubmitButtons/SubmitNrf";
import Typography from "../Typography";

interface NrfModalProps {
  isOpen: boolean;
  setOpen: Function;
}
interface IMessage {
  message: string;
  color: string;
}

export const NrfModal: React.FC<NrfModalProps> = ({
  isOpen,
  setOpen,
}) => {
  const [token, setToken] = useState<string>("");
  const [deviceIp, setDeviceIp] = useState<string>("");
  const [message, updateMessage] = useState({ message: "", color: "white" });
  const [minerKey, setMinerKey] = useState<string>("");
  const [disappear, setDisappear] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpen(false);
    setToken("");
    setDeviceIp("");
    setMinerKey("");
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
        <Typography className="mb-3" variant="title">Please enter Nrf credentials below:</Typography>
        <NrfInput
          token={token}
          setToken={setToken}
          inputType="server"
          placeholder="Enter Token"
        />
        <NrfInput
          token={deviceIp}
          setToken={setDeviceIp}
          inputType="id"
          placeholder="Enter Device Id"
        />
        <NrfInput
          token={minerKey}
          setToken={setMinerKey}
          inputType="id"
          placeholder="Enter Miner Key"
        />
        <SubmitNrfKeyButton
          updateMessage={updateMessage}
          token={token}
          deviceId={deviceIp}
          minerKey={minerKey}
          disappearInput={setDisappear}
        />

        <Typography variant="p" className={'text-white text-center mt-10 font-bold'}>
          {message.message}
        </Typography>
      </div>
    </Modal>
  );
}
