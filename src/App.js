import react, { useState } from "react";
import axios from "axios";
import wind from "./assets/wind.gif";
import humidity from "./assets/temperature.gif";
import cloud from "./assets/clouds.gif";
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=307d1d32d430b0cfeb005be0ccfb665f`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setLocation("");
    }
  };

  const date = new Date();

  return (
    <>
      <div className="container mx-auto text-white">
        <div className="mx-10 md:mx-32 lg:mx-80 mt-10">
          {/* top */}
          <div className="text-center">
            <input
              className="py-3 px-5 rounded-full bg-white bg-opacity-20 placeholder-white outline-dashed focus:outline-dashed focus:outline-2 focus:outline-slate-400"
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder="Enter Location"
            />
          </div>
          <div className="text-center font-bold mt-5">
            <h1>{date.toDateString()}</h1>
          </div>

          {/* content */}
          <div className=" mt-20 mb-72 flex flex-row relative">
            <div className="basis-1/2">
              <div className="">
                {data.name ? (
                  <p className="text-3xl ">
                    {data.name}, {data.sys.country}
                  </p>
                ) : null}
              </div>
              <div>
                {data.main ? (
                  <h1 className="text-5xl font-bold ">
                    {data.main.temp.toFixed()}℃
                  </h1>
                ) : null}
              </div>
            </div>

            <div className="basis-1/2 absolute right-0">
              {data.weather ? (
                <h1 className="text-3xl">
                  <p>{data.weather[0].main}</p>
                </h1>
              ) : null}
            </div>
          </div>

          {/* bottom */}
          <div className=" relative">
            <div className="py-5 px-5 rounded-xl bg-white bg-opacity-20 mt-36 flex justify-around absolute bottom-0 inset-x-0">
              <div className="text-center">
                {/* <img
                src={wind}
                width="50px"
                alt="wind"
                className="rounded-full mx-auto"
              /> */}
                <div className="">
                  <h1 className="text-base text-slate-300">Speed:</h1>
                  {data.wind ? (
                    <h1 className="text-xl font font-semibold">
                      {data.wind.speed} km/h
                    </h1>
                  ) : null}
                </div>
              </div>
              <div className="text-center">
                {/* <img
                src={humidity}
                width="50px"
                alt="wind"
                className="rounded-full mx-auto"
              /> */}
                <div className="">
                  <h1 className="text-base text-slate-300">Humidity:</h1>
                  {data.main ? (
                    <h1 className="text-xl font font-semibold">
                      {data.main.humidity} %
                    </h1>
                  ) : null}
                </div>
              </div>
              <div className="text-center">
                {/* <img
                src={cloud}
                width="50px"
                alt="wind"
                className="rounded-full mx-auto"
              /> */}
                <div className="">
                  <h1 className="text-base text-slate-300">Clouds:</h1>
                  {data.clouds ? (
                    <h1 className="text-xl font font-semibold">
                      {data.clouds.all} %
                    </h1>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
