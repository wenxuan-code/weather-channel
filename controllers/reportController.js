function fillReport({ currently, hourly, daily, datetime, location }) {
  const report = [
    `Kia ora ${location}, it is ${datetime} now. I am reporter Tellie, here to being you the weather update.`,

    `Right now, the conditions are "${currently.condition}". It feels like ${currently.temperature}°C.`,

    `For the next few hours, the conditions will be "${hourly.condition}"`,

    `In the coming week, the conditions will be "${daily.condition}"`,

    `Thanks for tuning in!`,
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
    `<div class="tv_bottom" hx-post="/clicked/${index}" hx-trigger="click" hx-swap="outerHTML">
        <p>${report[index]}</p>
      </div>`,
  );
}
