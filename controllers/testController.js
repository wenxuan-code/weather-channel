export async function click(req, res) {
  res.setHeader("Content-Type", "text/html").send("<p>htmx success!!!</p>");
}
