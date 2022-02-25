import response from "./fake-response";



function cache(){

}


export function getDay(day : string){
    return response.forecast.forecastday.find(x => x.date === day);
}