import BuilderCard from "./BuilderCard";

export default function NetworkSection({ builders }) {
  return (
    <div className="">
      {/* Label strip */}
      <div className="px-5 md:px-8 pt-7 pb-5">
        <p className="text-[11px] font-bold tracking-[0.12em] text-gray-500 uppercase">
          Your Network ({builders.length})
        </p>
      </div>

      {/* Cards grid */}
      <div className="px-5 md:px-8 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {builders.map((builder, index) => (
            <BuilderCard key={index} builder={builder} />
          ))}
        </div>
      </div>
    </div>
  );
}