"use client";

import { TabNav, Text, Spinner } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const navBarStyle = {
  width: "100%",
  height: "8vh",
  alignContent: "center",
  justifyContent: "center",
};

export default function Navbar() {
  const params = useParams();
  const nameParam = Array.isArray(params?.name)
    ? params?.name[0]
    : params?.name;

  const [defaulTest, setDefaulTest] = useState(nameParam);
  const [listTests, setListTests] = useState<string[]>([]);

  useEffect(() => {
    if (listTests.length === 0) {
      fetch(`${window.location.protocol}//${window.location.host}/api/test`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setListTests(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [listTests]);

  if (listTests.length === 0) {
    return (
      <TabNav.Root justify="center" style={navBarStyle}>
        <div style={{ marginBottom: "2vh" }}>
          <Spinner size="2" />
        </div>
      </TabNav.Root>
    );
  }

  return (
    <TabNav.Root justify="center" style={navBarStyle}>
      <TabNav.Link
        href="/"
        active={defaulTest === "home" ? true : false}
        key={100}
      >
        <Text size={"6"} color="indigo">
          Home
        </Text>
      </TabNav.Link>
      {listTests.map((test, index) => (
        <TabNav.Link
          href={`/test/${test}`}
          active={defaulTest === test ? true : false}
          key={index}
        >
          <Text size={"6"}>
            {test?.charAt(0).toUpperCase() + test?.slice(1)}
          </Text>
        </TabNav.Link>
      ))}
    </TabNav.Root>
  );
}
