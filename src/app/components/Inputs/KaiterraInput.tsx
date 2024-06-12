interface IKaiterraInput {
  token: string;
  setToken: (token: string) => void;
  setValid?: (isValid: boolean) => void;
  disappear?: boolean;
  placeholder: string;
  inputType: string;
}

const KaiterraInput: React.FC<IKaiterraInput> = ({
  token,
  setToken,
  disappear,
  placeholder,
  inputType,
}) => {

  return (
    <input
      type={inputType}
      value={token}
      autoComplete="off"
      data-lpignore="true"
      data-form-type="other"
      onChange={(e) => {
        const newToken = e.target.value;
        setToken(newToken);
      }}
      placeholder={placeholder}
      className={`${
        disappear ? "opacity-0" : ""
      } appearance-none border h-11 w-[300px] border-gray-300 text-black rounded-md py-2 px-4 mb-6 leading-tight focus:outline-none focus:border-blue-500`}
    />
  );
}

export default KaiterraInput;
