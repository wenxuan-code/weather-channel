export async function click(req, res) {

  let index = Number(req.params.index);

  index += 1;
  console.log(index)

  res
    .setHeader("Content-Type", "text/html")
    .send(
      `<div class="tv_bottom" hx-post="/clicked/${index}" hx-trigger="click" hx-swap="outerHTML">
        <p>Kia ora <%= location %>. It's <%= datetime %> now. I am reporter Tellie, here to being you the weather update.asdf
      </div>`,
    );
}
