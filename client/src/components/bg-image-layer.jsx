import bgImage from "/images/paclogo.png";

const BgImageLayer = () => {
  return (
    <div className="mt-14 fixed inset-0 z-[-1] flex items-center justify-center bg-opacity-30">
      <img
        src={bgImage}
        alt="Background"
        className="opacity-[11%] w-[300px] md:w-[400px]"
      />
    </div>
  );
};

export default BgImageLayer;
