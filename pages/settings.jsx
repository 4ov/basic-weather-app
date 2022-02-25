import { useEffect } from "preact/hooks";
import { ExternalLink, Moon } from "react-feather";
import { useLocalStorage } from "react-use";
import { useLocation } from "wouter-preact";
import CheckBox from "../components/checkbox";
import { hideDialog, showDialog } from "../components/dialog";
import PageHeader from "../components/page-header";
import Select from "../components/select";
import { updateTheme } from "../utils/ops";

export default function SettingsPage({}) {
  const [, to] = useLocation();
  const [theme, setTheme] = useLocalStorage("ww:theme", "light");
  const [useF, setUseF] = useLocalStorage("ww:useF", false);

  useEffect(() => {
    updateTheme(theme);
  }, [theme]);
  return (
    <div className="base_page settings_page beta">
      <PageHeader onBack={() => to("/")} title={"settings"} />
      <div className="_body">
        <ul className="list">
          <li>
            <span>Dark Theme</span>
            <div>
              <Select
                onChange={(e) => {
                  console.log(e);
                  setTheme(e.value);
                }}
                options={[
                  {
                    title: "Light",
                    value: "light",
                    default: theme === "light",
                  },
                  { title: "Dark", value: "dark", default: theme === "dark" },
                  {
                    title: "System default",
                    value: "default",
                    default: theme === "default",
                  },
                ]}
              />
            </div>
            {/* <CheckBox
              checked={theme === "dark"}
              onChange={(ev) => {
                const value = ev.target.checked;
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            /> */}
          </li>
          {/* <li>
            <span>Recive Emails</span>
            <CheckBox />
          </li> */}
          <li>
            <span>Use fahrenheit</span>
            <CheckBox
              checked={useF}
              onChange={() => {
                setUseF(!useF);
              }}
            />
          </li>
          <li>
            <i className="f f-color-secondary">
              This is a static demo with old data.
              <br />
              thanks for <a href="https://weatherapi.com">weatherapi</a> for providing this data snapshot.
              <br />
              icons from <a href="https://feathericons.com/">feather</a>.
            </i>
            {/* <span>About</span>
            <ExternalLink /> */}
          </li>
        </ul>
      </div>
    </div>
  );
}
