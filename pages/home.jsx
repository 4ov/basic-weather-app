import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import moment from "moment";
import { useState } from "preact/hooks";
import {
  Navigation,
  Settings,
  Sun,
  Wind,
} from "react-feather";
import { useLocalStorage } from "react-use";
import { Link, useLocation } from "wouter-preact";
import Line from "../components/line";
import PageHeader from "../components/page-header";
import response from "../utils/fake-response";
import { celiusToFahrenheit } from "../utils/units";

export default function HomePage({}) {
  return (
    <div className="base_page home_page beta">
      <PageHeader
        title={"Home"}
        onRight={
          <>
            <Link to="/settings">
              <Settings />
            </Link>
          </>
        }
      />
      <div
        layout
        className="_body"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {response.forecast.forecastday.map((day, index) => {
          //   day.day.condition.icon
          const dayName = moment(day.date).format("dddd");
          return <Box index={index} day={day} />;
        })}
      </div>
    </div>
  );
}

function Box({ day, index }) {
  const [f, setF] = useLocalStorage("ww:useF", false);
  const isToday = moment(day.date).isSame(moment(), "day");
  const [loc, setLoc] = useLocation();
  console.log(day);

  return (
    <div
      onClick={() => {
        setLoc(`/day/${day.date}`);
      }}
      className="box"
      style={{
        "--i": index,
      }}
    >
      <h1>{isToday ? "Today" : moment(day.date).format("dddd")}</h1>
      <div className="row_1">
        <span style={{ fontSize: 64 }} className={`temp ${f ? "f" : "c"}`}>
          {f ? celiusToFahrenheit(day.day.avgtemp_c) : day.day.avgtemp_c}
        </span>
        <Line />
        <span>
          <img src={day.day.condition.icon} />
        </span>
      </div>
      <div className="row_2">
        <span>{day.day.condition.text}</span>
        <Line h={16} />
        <span>
          Feels <span className="temp">{day.day.avgtemp_c}</span>
        </span>
        <Line h={16} />
        <span className="flex items-center" style={{ gap: "0.5rem" }}>
          {day.day.maxwind_kph} km/h <Wind />
        </span>
      </div>
      <div className="row_3 flex justify-center">
        <span>Last update: {moment(day.day.last_updated).fromNow()}</span>
      </div>
    </div>
  );
}

