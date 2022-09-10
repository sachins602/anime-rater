import type { ButtonProps } from "./types";

function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    >
      {props.name}
      {props.children}
    </button>
  );
}

export default Button;
