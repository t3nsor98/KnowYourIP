import "./App.css";
import { useState, useEffect } from "react";
import Squares from "./Squares";

const accessKey = import.meta.env.VITE_API_KEY;

function App() {
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user IP from ipify
        const ipResponse = await fetch(`https://api.ipify.org?format=json`);
        const ipData = await ipResponse.json();
        const ip = ipData.ip;

        // Fetch IP details from ipstack
        const url = `https://api.ipstack.com/${ip}?access_key=${accessKey}`;
        const locationResponse = await fetch(url);

        if (!locationResponse.ok) {
          throw new Error(`HTTP error! status: ${locationResponse.status}`);
        }
        const locationData = await locationResponse.json();
        setIpData(locationData);
      } catch (error) {
        console.error("Error fetching data:", error); // Log error for debugging
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Dependency array ensures this runs only once

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="up" // up, down, left, right, diagonal
          borderColor="#fff"
          hoverFillColor="#222"
        />
      </div>
      <div className="p-8 max-w-lg w-full bg-white z-10 rounded-xl shadow-lg space-y-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Know Your IP
        </h1>
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Your IP Information
        </h2>

        {loading && (
          <div className="flex justify-center">
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        )}

        {error && (
          <p className="text-red-500 text-center font-semibold">{error}</p>
        )}

        {ipData && (
          <div className="text-gray-700 space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p>
                <strong>IP Address:</strong> {ipData.ip}
              </p>
              <p>
                <strong>Type:</strong> {ipData.type}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p>
                <strong>Country:</strong> {ipData.country_name} (
                {ipData.country_code})
              </p>
              <p>
                <strong>Region:</strong> {ipData.region_name} (
                {ipData.region_code})
              </p>
              <p>
                <strong>City:</strong> {ipData.city}
              </p>
              <p>
                <strong>Zip Code:</strong> {ipData.zip}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p>
                <strong>Latitude:</strong> {ipData.latitude}
              </p>
              <p>
                <strong>Longitude:</strong> {ipData.longitude}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p>
                <strong>Continent:</strong> {ipData.continent_name} (
                {ipData.continent_code})
              </p>
              <p>
                <strong>Calling Code:</strong> +{ipData.location?.calling_code}
              </p>
              <p>
                <strong>Is EU:</strong> {ipData.location?.is_eu ? "Yes" : "No"}
              </p>
              <img
                src={ipData.location?.country_flag}
                alt="Country Flag"
                className="w-16 h-10 mt-2 mx-auto"
              />
            </div>
          </div>
        )}
      </div>
      <footer className="absolute bottom-0 left-0 w-full bg-gray-800 text-white py-2 text-center">
        Made with ❤️ by{" "}
        <href
          href="https://github.com/t3nsor98"
          className="cursor-pointer hover:text-blue-500"
        >
          T3nsor
        </href>
        . Powered by{" "}
        <href
          href="https://ipstack.com/"
          className="cursor-pointer hover:text-blue-500"
        >
          IPStack
        </href>
      </footer>
    </div>
  );
}

export default App;
