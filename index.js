const axios = require("axios");
const cheerio = require("cheerio");
const http = require("http");
const port = 3000;

const scrapping = async () => {
  // Fetch the HTML of the webpage
  const response = await axios.get(
    "https://articulo.mercadolibre.com.ve/MLV-729623984-telefono-celular-blu-g61s-464-gb-dual-sim-4g-_JM#polycard_client=recommendations_home_items-decorator&reco_backend=item_decorator&reco_client=home_items-decorator&reco_item_pos=0&reco_backend_type=function&reco_id=1d87d975-254a-4e33-b4be-79d0513b422e");
  const html = response.data;

  // Parse the HTML with Cheerio
  const $ = cheerio.load(html);

  // Extract data from each element with the target class
  $(".andes-money-amount__fraction").each((index, element) => {
    // Replace with the class you want to scrape
    const scrapedData = $(element).text().trim();
    if (index + 1 == 2) {
      console.log(`Precio del producto:`, scrapedData, "$");
    }
  });
};

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    setInterval(() => scrapping(res), 10800);  //Calls the function every 3 minutes
  });
  
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
