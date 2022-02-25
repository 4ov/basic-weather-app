import { useEffect } from "preact/hooks";
import { useLocalStorage } from "react-use";
import { Route, Switch } from "wouter-preact";
import DayPage from "../pages/day";
import HomePage from "../pages/home";
import SettingsPage from "../pages/settings";
import { updateTheme } from "../utils/ops";



export function App(props) {
  const [theme, setTheme] = useLocalStorage("ww:theme", "default");
  const [f, setF] = useLocalStorage("ww:useF", false);
  const [city, setCity] = useLocalStorage("ww:city", "London");
  
  useEffect(()=>{updateTheme(theme)}, [])


  return (
    <>
     <Switch>
       <Route path="/">
        <HomePage />
       </Route>
       <Route path="/settings" component={SettingsPage} />
       <Route path="/day/:id" component={DayPage} />
     </Switch>
    </>
  )
}
