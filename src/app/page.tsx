import { getDirectories } from "@/lib/utils";

export default async function Home() {
  const directories =  getDirectories("./public");

  return (<div>
    {directories.map((test: string) => (
      <div key={test} style={{ margin: "1rem" }}>
        <a href={`/test/${test}`}>
          <h2 style={{ color: "indigo" }}>{test.charAt(0).toUpperCase() + test.slice(1)}</h2>
        </a>
      </div>
    ))}
  </div>)
}
