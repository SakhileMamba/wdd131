const temperature = 28;
const wind_speed = 10;
let wind_chill_text = document.querySelector("#wind_chill");

function calculateWindChill(temp, speed) {
  return 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
}

if (temperature <= 10 && wind_speed > 4.8) {
  wind_chill_text.textContent = calculateWindChill(temperature, wind_speed).toFixed(2) + "ºC"
} else {
  wind_chill_text.textContent = "N/A"
}

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").innerHTML = `Last Modification: ${document.lastModified}`;