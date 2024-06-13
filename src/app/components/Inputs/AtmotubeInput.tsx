interface IAtmotubeInput {
  token: string;
  setToken: (token: string) => void;
  setValid?: (isValid: boolean) => void;
  disappear?: boolean;
  placeholder: string;
  inputType: string;
}

const AtmotubeInput: React.FC<IAtmotubeInput> = ({
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
      onChange={(e) => { setToken(e.target.value)}}
      placeholder={placeholder}
      className={`${
        disappear ? "opacity-0" : ""
      } appearance-none border h-11 w-[300px] border-gray-300 text-black rounded-md py-2 px-4 mb-6 leading-tight focus:outline-none focus:border-blue-500`}
    />
  );
};

export default AtmotubeInput;
