export default function MyButton({ text, myFunc }) {
  return (
    <span
      onClick={myFunc ? myFunc : null}
      className="text-xl text-white h-full w-full flex justify-center items-center px-3 py-2 rounded font-mono bg-blue-500"
    >
      {text}
    </span>
  );
}
