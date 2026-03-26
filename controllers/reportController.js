function fillReport({ currently, hourly, daily, datetime, location }) {
  const report = [
    {
      text: `Kia ora <span class="bold">${location}</span>! It is currently <span class="bold">${datetime}.</span>`,
      icon: "wizard",
      alt: "wizard weather forecast logo",
      tellieImg: "tellie",
      tellieAlt: "Tellie looking at the straight at the viewer and talking.",
    },
    {
      text: `You're watching the <span class="bold">Wizard Weather Forecast</span>. I am your reporter <span class="bold">Tellie</span>, bringing you the latest weather update.`,
      icon: "wizard",
      alt: "wizard weather forecast logo",
      tellieImg: "tellie",
      tellieAlt: "Tellie looking at the straight at the viewer and talking.",
    },
    {
      text: `Right now, the conditions are <span class="bold">"${currently.condition.toLowerCase()}"</span>. It feels like <span class="bold">${currently.temperature}°C</span>.`,
      icon: `${currently.icon}`,
      alt: currently.icon,
      tellieImg: "tellie-currently",
      tellieAlt:
        "Tellie looking to the right, talking and pointing to the weather icon with their star wand.",
    },
    {
      text: `For the next few hours, conditions are <span class="bold">"${hourly.condition.toLowerCase()}"</span>`,
      icon: `${hourly.icon}`,
      alt: hourly.icon,
      tellieImg: "tellie-hourly",
      tellieAlt:
        "Tellie looking at the straight at the viewer, talking, smiling and waving their hands.",
    },
    {
      text: `Our predictions for the coming week are "<span class="bold">${daily.condition.toLowerCase()}</span>"`,
      icon: `${daily.icon}`,
      alt: daily.icon,
      tellieImg: "tellie-daily",
      tellieAlt: "Telling talking while looking at a shining orb.",
    },
    {
      text: `...And that's it for the weather report. As usual, nothing is definite as the whims of nature are beyond our ken.`,
      icon: "wizard",
      alt: "wizard weather forecast logo",
      tellieImg: "tellie",
      tellieAlt: "Tellie looking at the straight at the viewer and talking.",
    },
    {
      text: `Thanks for tuning in!`,
      icon: "wizard",
      alt: "wizard weather forecast logo",
      tellieImg: "tellie",
      tellieAlt: "Tellie looking at the straight at the viewer and talking.",
    },
    {
      text: ``,
      icon: "wizard",
      alt: "",
      tellieImg: "tellie",
      tellieAlt: "",
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
    `<button class="tv ${index === 0 ? "turn-on" : ""} ${index === report.length - 1 ? "turn-off" : ""}" hx-post="/clicked/${index}" hx-trigger="click" hx-swap="outerHTML">

      <div class="tv_top">
        <div class="tv__graphic">
          <picture>
           <source srcset="./images/weather-icons/${report[index].icon}.webp" type="image/webp" />
          <img src="./images/weather-icons/${report[index].icon}.png" alt="${report[index].alt}">
          </picture>
        </div>
        <div class="tv__reporter">
          <picture>
          <source srcset="./images/${report[index].tellieImg}50.gif" media="(width < 430px)" />
          <img src="./images/${report[index].tellieImg}.gif" alt="${report[index].tellieAlt}">
          </picture>
        </div>
      </div>
      <div class="tv_bottom">
        <p>${report[index].text}</p>
        <svg class="next-arrow" viewBox="0 0 24 24"><path d="M1 3h22L12 22"/></svg>
      </div>
    </button>`,
  );
  return;
}
