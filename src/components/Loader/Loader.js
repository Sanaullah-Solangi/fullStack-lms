export default function Loader({ label }) {
  return (
    <div className="fixed left-0 top-0 z-10 h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
      <h1 className="text-5xl text-white">{label ? label : "Loading......"}</h1>
    </div>
  );
}
