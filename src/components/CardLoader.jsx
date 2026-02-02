const CardLoader = () => (
    <div className="bg-white border border-black/10 rounded-2xl p-6 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start h-32">
        <div className="space-y-2">
          <div className="h-4 bg-black/10 rounded w-3/4"></div>
          <div className="h-8 bg-black/10 rounded w-full"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-black/10 rounded w-1/2"></div>
          <div className="h-10 w-24 bg-yellow-300 rounded-xl"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-black/10 rounded w-3/4"></div>
          <div className="h-8 w-3/4 bg-black/10 rounded-full"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-black/10 rounded w-1/2"></div>
          <div className="h-10 bg-black/10 rounded w-full text-right"></div>
        </div>
      </div>
    </div>
  );

  export default CardLoader;