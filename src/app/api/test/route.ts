// https://nextjs.org/blog/building-apis-with-nextjs
import { NextRequest } from "next/server";
import { cookies, headers } from "next/headers";
import { after } from "next/server";
import scrape from "@/lib/scrape";
import { testElement } from "types/test";
import { promises as fs } from "fs";
import { getDirectories } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const searchParams = request?.nextUrl.searchParams;
  const query = searchParams.get("name") ?? "";

  const testNames = getDirectories("./public");

  if (testNames.indexOf(query) === -1) {
    return new Response(JSON.stringify(testNames), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const file = await fs.readFile(`public/${query}/config.json`, "utf8");

  return new Response(JSON.stringify(file ? JSON.parse(file) : []), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { name, list } = body;

  try {
    await fs.mkdir(`public/${name}/img`, { recursive: true });
  } catch (err) {
    console.log(err);
  }

  const config: testElement[] = [];

  // generate config.json for the test
  list.forEach((spec: any) => {
    config.push({
      nombre: spec?.especie,
      familia: spec?.familia,
      imagenes: [],
    });
  });

  await fs.writeFile(`public/${name}/config.json`, JSON.stringify(config));

  after(async () => {
    scrape(`public/${name}/config.json`, name);
  });

  return new Response(JSON.stringify(name), {
    status: 202,
    headers: { "Content-Type": "application/json" },
  });
}
