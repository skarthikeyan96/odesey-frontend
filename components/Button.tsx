const Button = ({ text, type }: { text: string, type:  "button" | "submit" | "reset" | undefined }) => {
  return (
    <button type={type} className="bg-slate-800  text-white tracking-normal text-lg font-sans  py-2 px-4 rounded w-full">
      {text}
    </button>
  );
};

export default Button;
