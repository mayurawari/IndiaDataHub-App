import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "../../components/Button";
import CardLoader from "../../components/CardLoader";
import { useNavigate } from "react-router";

export const DashBoard = () => {
  const { isloggedin, logout } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 10;
  const navigate = useNavigate();
  const handleLogout = () => {
    if (isloggedin) logout();
    navigate("/");
  };

  const regionSetter = (data) => {
    const regionSet = new Set();
    data.forEach((ele) => {
      if (ele?.region) regionSet.add(ele.region);
    });
    setRegions(["All", ...regionSet]);
  };

  const filteredData = useMemo(() => {
    return selectedRegion === "All"
      ? data
      : data.filter((item) => item.region === selectedRegion);
  }, [data, selectedRegion]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,region,subregion,population,independent"
        );

        if (!res.ok) {
          throw new Error("API Error");
        }

        const json = await res.json();
        setData(json);
        regionSetter(json);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white">
        <header className="h-24 bg-yellow-300 flex items-center justify-between px-6 lg:px-10">
          <h1 className="font-bold text-3xl lg:text-4xl text-black">
            IDH-IndiaDataHub
          </h1>
          <Button Text="Logout" onClick={handleLogout} />
        </header>

        <div className="w-full flex flex-col lg:flex-row px-4 lg:px-6 py-8 gap-6 max-w-7xl mx-auto">
          <section className="lg:w-1/4 rounded-3xl p-6 border border-black/20 shadow-2xl">
            <div className="animate-pulse">
              <div className="h-6 bg-black/10 rounded w-3/4 mb-4"></div>
              <div className="h-12 bg-black/10 rounded-2xl w-full"></div>
            </div>
          </section>
          <section className="lg:w-3/4 rounded-3xl p-6 border border-black/10 shadow-2xl space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <CardLoader key={i} />
            ))}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <header className="h-24 bg-yellow-300 flex items-center justify-between px-4 sm:px-6 lg:px-10">
        <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-black hover:text-gray-600 cursor-pointer">
          IDH-IndiaDataHub
        </h1>
        <Button Text="Logout" onClick={handleLogout} />
      </header>

      <div className="w-full flex flex-col lg:flex-row px-4 lg:px-6 py-8 gap-6 max-w-7xl mx-auto">
        <section className="lg:w-1/4 rounded-3xl p-4 sm:p-6 lg:p-8 border border-black/20 shadow-2xl h-fit sticky top-8 lg:top-24">
          <label className="block text-lg font-semibold text-black mb-4 tracking-wide">
            Filter by Region
          </label>

          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full p-3 sm:p-4 rounded-2xl bg-white border-2 border-black/20 shadow-lg focus:border-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-200/50 transition-all duration-300 text-black font-medium text-sm hover:shadow-xl"
          >
            {regions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {error && (
            <div className="mt-4 p-3 bg-red-400 rounded-2xl border border-red-500/50">
              <p className="text-red-900 font-semibold text-sm">
                {error}
              </p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-black/20">
            <p className="text-black/80 font-medium text-sm">
              Showing{" "}
              <span className="font-bold text-yellow-900">
                {filteredData.length}
              </span>{" "}
              countries
              <span className="block mt-1 text-xs opacity-75">
                Page {currentPage} of {totalPages || 1}
              </span>
            </p>
          </div>
        </section>

        <section className="lg:w-3/4 rounded-3xl p-4 sm:p-6 lg:p-8 border border-black/10 shadow-2xl z-10">
          {paginatedData.length === 0 && (
            <p className="text-center text-black/60 py-20">
              No countries found
            </p>
          )}

          {paginatedData.map((item) => (
            <div
              key={item.name.common}
              className="group bg-white border border-black/10 rounded-2xl p-4 sm:p-6 mb-4 hover:border-yellow-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase mb-2">
                    Country
                  </label>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-black">
                    {item.name.common}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase mb-2">
                    Region
                  </label>
                  <div className="px-3 py-2 bg-yellow-400 rounded-xl border border-yellow-500">
                    <span className="font-semibold text-black text-sm">
                      {item.region || "N/A"}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase mb-2">
                    Subregion
                  </label>
                  <span className="px-3 py-1.5 bg-black/10 text-black/80 font-medium rounded-full text-sm border border-black/20">
                    {item.subregion || "N/A"}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase mb-2">
                    Population
                  </label>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-bold text-black block">
                      {item.population.toLocaleString()}
                    </span>
                    <span className="text-xs text-black/50">
                      people
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="mt-12 pt-8 border-t-2 border-black/20 flex justify-center items-center gap-6">
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.max(p - 1, 1))
                }
                disabled={currentPage === 1}
                className="px-6 py-3 bg-black text-yellow-300 font-bold rounded-2xl shadow-lg hover:bg-yellow-400 hover:text-black transition-all disabled:opacity-50"
              >
                Previous
              </button>

              <span className="font-semibold text-black">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(p + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="px-6 py-3 bg-black text-yellow-300 font-bold rounded-2xl shadow-lg hover:bg-yellow-400 hover:text-black transition-all disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
