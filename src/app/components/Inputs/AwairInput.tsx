const AwairInput = ({
    token,
    setToken,
    setValid,
    disappear,
    placeholder,
    inputType,
    type
  }: {
    token: string;
    setToken: Function;
    setValid?: Function;
    disappear?: boolean;
    placeholder: string;
    inputType: string;
    type?: "authkey" | "id";
  }) => {

    // const isValidKey = (key: string) => {
    //   if (type === "authkey") {
    //     return /^[a-zA-Z0-9]{92}$/i.test(key);
    //   } else if (type === "id") {
    //     return /^[0-9a-f]{12}$/i.test(key);
    //   }
    //   else if (type === "server") {
    //     return /^https:\/\/[a-zA-Z0-9-]+\.shelly\.cloud$/i.test(key);
    //   }
    //   return false;
    // };

    return(
    <input
      type={inputType}
      value={token}
      autoComplete="off"
      data-lpignore="true"
      data-form-type="other"
      onChange={(e) => {
        const newToken = e.target.value;
        setToken(newToken);
        // if (setValid) {
          // setValid(isValidKey(newToken));
        // }
      }}
      placeholder={placeholder}
      className={`${
        disappear ? "opacity-0" : ""
      } appearance-none border h-11 w-[300px] border-gray-300 text-black rounded-md py-2 px-4 mb-6 leading-tight focus:outline-none focus:border-blue-500`}
    />
  );
}
  
  export default AwairInput;
  