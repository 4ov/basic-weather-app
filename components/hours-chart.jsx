import moment from "moment";

export default function Hours({ hours }) {
  return (
    <div style={{
        padding: "1rem",
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',

    }}>
        <h2 className="f-thin" style={{
            textAlign : 'left',
            // background : 'red',
            width : 320
        }}>By hour</h2>
      <div className="_hours">
        {hours.map((hour) => (
          <div className="_hour">
              <span className="temp c">
              {hour.temp_c}
              </span>
            <img src={hour.condition.icon} alt="" />
                <span>
                {
                    moment(hour.time.split(" ")[1].split(":")[0], "hh").format("h A")
                }
                </span>
          </div>
        ))}
      </div>
    </div>
  );
}
