window.addEventListener('load', () => {
  let long;
  let lat;
  let tempDecription = document.querySelector('.temperature-description');
  let tempDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let icon = document.querySelector('#icon');
  let temperatureSection = document.querySelector('.degree-section');
  const temperatureSpan = document.querySelector('.degree-section span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(long, lat);

      const api = `http://api.weatherapi.com/v1/forecast.json?key=bd63ee92f317425383525039210909&q=${lat},${long}&days=7`;
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const { temp_f, temp_c, condition } = data.current;
          //   Set DOM Elements from API
          tempDegree.textContent = temp_f;
          tempDecription.textContent = condition.text;
          locationTimezone.textContent = data.location.name;
          icon.src = condition.icon;

          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureSpan.textContent = 'C';
              tempDegree.textContent = temp_c;
            } else {
              temperatureSpan.textContent = 'F';
              tempDegree.textContent = temp_f;
            }
          });
        });
    });
  }
});
