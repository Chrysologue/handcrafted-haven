interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`mt-5 bg-black py-3 px-10 rounded-xl cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}