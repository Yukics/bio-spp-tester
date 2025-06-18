import fs from "fs";
import { createWriteStream } from "fs";
import { Readable } from "stream";
import { testElement } from "types/test";
import { promises as fsPromise } from "fs";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function scrape(
  path: string,
  name: string
): Promise<void> {
  console.log(`Scraping data from: ${path}`);

  const fileContent = fs.readFileSync(path, "utf-8");
  const data: testElement[] = JSON.parse(fileContent);

  for (let i = 0; i < data.length; i++) {
    const images = await googleImage(data[i].nombre);

    const imagenes = downloadImage(
      path.split("/").slice(0, -1).join("/"),
      data[i].nombre,
      images
    );
    data[i]["imagenes"] = imagenes;
    fsPromise.writeFile(`public/${name}/config.json`, JSON.stringify(data));

    await sleep(2000);
    setTimeout(
      () => console.log(`Scraped images for ${data[i].nombre}`),
      2000
    );
  }
}

async function googleImage(query: string): Promise<string[]> {
  // This function is a placeholder for the actual Google Image scraping logic.
  // You would implement your scraping logic here, using the provided query.
  console.log(`Searching for images with query: ${query}`);
  let response: string[] = [];

  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("accept-language", "es-ES,es;q=0.9,en;q=0.8,ko;q=0.7");
  myHeaders.append("cache-control", "no-cache");
  myHeaders.append("dnt", "1");
  myHeaders.append("downlink", "10");
  myHeaders.append("pragma", "no-cache");
  myHeaders.append(
    "user-agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
  );

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  // https://programmablesearchengine.google.com/controlpanel/all
  // https://developers.google.com/custom-search/v1/introduction?hl=es-419
  await fetch(
    `https://customsearch.googleapis.com/customsearch/v1?c2coff=0&cx=92cb89759447e4ebc&q=${query}&safe=active&searchType=image&key=${process.env.GOOGLE_TOKEN}&filter=1&num=5`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      try {
        for (const item of result?.items) {
          response.push(item?.link);
        }
      } catch (err) {
        console.log(err, JSON.stringify(result));
      }
    })
    .catch((error) => console.error(error));

  console.log(`Found image URLs for query "${query}":`, response);

  return response; // This should return the scraped image URLs as an array of strings.
}

function downloadImage(path: string, name: string, urls: string[]): string[] {
  const imagenes: any = [];
  for (const imageUrl of urls) {
    console.log(
      `Downloading image for test ${path
        .split("/")
        .pop()} from URL: ${imageUrl}`
    );
    const fileName = imageUrl.split("/").pop().split("?")[0];
    try {
      fetch(imageUrl.split("?")[0]).then((image) => {
        if (image.ok && image.body) {
          console.log("Writing to file:", `${path}/img/${name}_${fileName}`);
          let writer = createWriteStream(`${path}/img/${name}_${fileName}`);
          Readable.fromWeb(image.body).pipe(writer);
        }
      });
      imagenes.push(`${name}_${fileName}`);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(imagenes);
  return imagenes;
}
