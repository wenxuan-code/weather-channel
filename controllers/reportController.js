function fillReport({ currently, hourly, daily, datetime, location }) {
  const report = [
    {
      text: `Kia ora ${location}, it is ${datetime} now. I am reporter Tellie, here to being you the weather update.`,
      icon: "wizard.png",
      alt: "wizard hat spinning"
    },
    {
      text: `Right now, the conditions are "${currently.condition.toLowerCase()}". It feels like ${currently.temperature}°C.`,
      icon: `${currently.icon}.png`,
      alt: currently.icon
    },
    {
      text: `For the next few hours, the conditions will be "${hourly.condition.toLowerCase()}"`,
      icon: `${hourly.icon}.png`,
      alt: hourly.icon
    },
    {
      text: `Our predictions for the coming week are "${daily.condition.toLowerCase()}"`,
      icon: `${daily.icon}.png`,
      alt: daily.icon
    },
    {
      text: `...And that's it for the weather report. Thanks for tuning in!`,
      icon: "wizard.png",
      alt: "wizard hat spinning"
    },
  ];

  return report;
}

export async function click(req, res) {
  const report = fillReport({
    currently: req.session.currently,
    hourly: req.session.hourly,
    daily: req.session.daily,
    datetime: req.session.datetime,
    location: req.session.location,
  });

  let index = Number(req.params.index);

  if (index === report.length - 1) {
    index = 0;
  } else {
    index += 1;
  }

  res.setHeader("Content-Type", "text/html").send(
    `<div class="tv" hx-post="/clicked/${index}" hx-trigger="click" hx-swap="outerHTML">

      <div class="tv_top">
        <div class="tv__graphic">
          <img src="./images/weather-icons/${report[index].icon}" alt="${report[index].alt}">
        </div>
        <div class="tv__reporter">
          <img src="./images/eiland-fall.jpg" alt="">
        </div>
      </div>
      <div class="tv_bottom">
        <p>${report[index].text}</p>
      </div>
    </div>`,
  );
}
