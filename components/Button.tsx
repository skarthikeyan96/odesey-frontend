const Button = ({ text, type, onClick }: { text: string, type:  "button" | "submit" | "reset" | undefined, onClick?: any}) => {
  return (
    <button type={type} onClick={onClick} className="bg-slate-800  text-white tracking-normal text-lg font-sans  py-2 px-4 rounded w-full">
      {text}
    </button>
  );
};

export default Button;
