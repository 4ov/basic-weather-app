import moment from "moment";
import { ArrowUp, ChevronDown, ChevronUp } from "react-feather";
import { useHash } from "react-use";
import { useLocation } from "wouter-preact";
import Hours from "../components/hours-chart";
import Line from "../components/line";
import PageHeader from "../components/page-header";
import { getDay } from "../utils/weather";

export default function DayPage(props) {
  const [, to] = useLocation();
  const now = moment();
  const day = getDay(props.params.id);
  const hoursLeft = day.hour.slice(now.hour(), now.hour() + 6);
  console.log(day);
  return (
    <div className="base_page day_page beta">
      <PageHeader title={"Today"} onBack={() => to("/")} />
      <div className="_body">
        <div className="__box flex items-center" style={{ gap: "1.25rem" }}>
          <h1 className="flex items-center">
            <span className="temp c">{day.day.maxtemp_c}</span> <ChevronUp />{" "}
          </h1>
          <Line />
          <h1 className="flex items-center">
            <span className="temp c">{day.day.mintemp_c}</span>
            <ChevronDown />
          </h1>
        </div>
        <Hours hours={hoursLeft} />
        <div
          style={{
            margin: "1rem",
          }}
        >
          <div
            className="flex dir-column items-center"
            style={{
              gap: "1rem",
            }}
          >
            <InfoRow title="Sunrise" value={`${day.astro.sunrise}`} />
            <InfoRow title="Sunset" value={`${day.astro.sunset}`} />
            <InfoRow
              title="Rain chance"
              value={`${day.day.daily_chance_of_rain}%`}
            />
            <InfoRow title="Humidity" value={day.day.avghumidity} />
            <InfoRow
              title="Moon illumination"
              value={`${day.astro.moon_illumination}`}
            />
            <InfoRow title="Wind speed" value={`${day.day.maxwind_kph} Km/h`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ title, value }) {
  return (
    <div
      className="flex items-center justify-space-between"
      style={{
        padding: "0.75rem 1rem",
        background: "var(--primary-bg)",
        color: "var(--primary-color)",
        borderRadius: "8px",
        minWidth: "300px",
        maxWidth: "425px",
      }}
    >
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
}
