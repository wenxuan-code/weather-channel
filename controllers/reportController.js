function fillReport({ currently, hourly, daily, datetime, location }) {
  const report = [
    {
      text: `Kia ora <span class="bold">${location}</span>! It is currently <span class="bold">${datetime}.</span>`,
      icon: "wizard.png",
      alt: "wizard weather forecast logo",
      tellieImg: "tellie.gif",
      tellieAlt: ""

    },
    {
      text: `You're watching the <span class="bold">Wizard Weather Forecast</span>. I am your reporter <span class="bold">Tellie</span>, bringing you the latest weather update.`,
      icon: "wizard.png",
      alt: "wizard weather forecast logo",
      tellieImg: "tellie.gif",
      tellieAlt: ""
    },
    {
      text: `Right now, the conditions are <span class="bold">"${currently.condition.toLowerCase()}"</span>. It feels like <span class="bold">${currently.temperature}°C</span>.`,
      icon: `${currently.icon}.png`,
      alt: currently.icon,
      tellieImg: "tellie-currently.gif",
      tellieAlt: ""
    },
    {
      text: `For the next few hours, conditions are <span class="bold">"${hourly.condition.toLowerCase()}"</span>`,
      icon: `${hourly.icon}.png`,
      alt: hourly.icon,
      tellieImg: "tellie-hourly.gif",
      tellieAlt: ""
    },
    {
      text: `Our predictions for the coming week are "<span class="bold">${daily.condition.toLowerCase()}</span>"`,
      icon: `${daily.icon}.png`,
      alt: daily.icon,
      tellieImg: "tellie-daily.gif",
      tellieAlt: ""
    },
    {
      text: `...And that's it for the weather report. As usual, nothing is definite as the whims of nature are beyond our ken.`,
      icon: "wizard.png",
      alt: "wizard weather forecast logo",
      tellieImg: "tellie.gif",
      tellieAlt: ""
    },
    {
      text: `Thanks for tuning in!`,
      icon: "wizard.png",
      alt: "wizard weather forecast logo",
      tellieImg: "tellie.gif",
      tellieAlt: ""
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
    `<button class="tv" hx-post="/clicked/${index}" hx-trigger="click" hx-swap="outerHTML">

      <div class="tv_top">
        <div class="tv__graphic">
          <img src="./images/weather-icons/${report[index].icon}" alt="${report[index].alt}">
        </div>
        <div class="tv__reporter">
          <img src="./images/${report[index].tellieImg}" alt="${report[index].tellieAlt}">
        </div>
      </div>
      <div class="tv_bottom">
        <p>${report[index].text}</p>
        <svg class="next-arrow" viewBox="0 0 24 24"><path d="M1 3h22L12 22"/></svg>
      </div>
    </button>`,
  );
}
