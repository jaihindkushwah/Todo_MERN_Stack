function CustomInput({
  RightIcon,
  LeftIcon,
  className,
  value,
  errorMessage,
  ...props
}) {
  return (
    <div >
      {LeftIcon ? LeftIcon : null}
      <input
        value={value}
        className={
          "h-8 rounded w-[200px] text-[14px] pl-1 pr-1 sm:w-[300px] sm:text-[16px] " +
          className
        }
        {...props}
      />
      <br />
      <p className="text-red-500 text-[12px]">&nbsp;{errorMessage}</p>
      {/* {errorMessage ? (
        <p className="text-red-500 text-[12px] ml-1">{errorMessage}</p>
      ) : null} */}
      {RightIcon ? RightIcon : null}
    </div>
  );
}

export default CustomInput;
