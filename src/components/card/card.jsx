const Card = ({ id, name, image, types, stats, title }) => {
  return (
    <div title={title} className="rounded-lg shadow-md overflow-hidden relative h-full min-h-[340px] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02] bg-gradient-to-br from-emerald-100 via-teal-200 to-cyan-100 hover:from-emerald-200 hover:via-teal-300 hover:to-cyan-200 text-gray-800">


      <div className="relative pt-5 px-5 flex items-center justify-center">
        <div
          className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
          style={{
            background: "radial-gradient(black, transparent 60%)",
            transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
            opacity: 0.15,
          }}
        ></div>
        <img
          className="relative w-32 drop-shadow-lg w-[200px] h-[180px]"
          src={image}
          alt={name}
        />
      </div>

      <div className="relative px-6 max-sm:px-2 pb-4 mt-4">
        <span className="block text-sm opacity-80">#{id}</span>
        <h2 className="text-2xl font-bold capitalize">{name}</h2>

        <div className="flex gap-2 mt-2 flex-wrap">
          {types.map((type, index) => (
            <span
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold capitalize shadow-sm"
            >
              {type}
            </span>
          ))}
        </div>

        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-sm space-y-1">
          <div className="flex justify-between">
            <span>HP</span>
            <span className="font-semibold">{stats.hp}</span>
          </div>
          <div className="flex justify-between">
            <span>Ataque</span>
            <span className="font-semibold">{stats.attack}</span>
          </div>
          <div className="flex justify-between">
            <span>Defensa</span>
            <span className="font-semibold">{stats.defense}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
