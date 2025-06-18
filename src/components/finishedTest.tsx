"use client";

import { Button, Flex, Separator, Callout } from "@radix-ui/themes";

export default function FinishedTest(props: any) {
  const { selectedTest, puntuacion, maxPuntuacion } = props;
  return (
    <Flex
      style={{ width: "100%", height: "80vh" }}
      align={"center"}
      direction={"column"}
      gap={"4"}
      justify={"center"}
    >
      <Callout.Root color="green" variant="soft" size="3">
        <Callout.Text style={{ fontSize: "1.5rem", textAlign: "center" }}>
          {puntuacion}/{maxPuntuacion} pts
        </Callout.Text>
        <Callout.Text style={{ fontSize: "1.2rem", color: "gray", textAlign: "center" }}>
          Has finalizado el test de {selectedTest?.toLowerCase()} 
        </Callout.Text>
        <Separator size="4" color="teal" style={{margin: "1vh"}}/>
        <Button
          style={{ marginTop: "-1%" }}
          onClick={() => window.location.reload()}
        >
          Reiniciar
        </Button>
        <Callout.Text
          style={{
            fontSize: "0.9rem",
            color: "gray",
            justifySelf: "center",
          }}
        >
          Aunque también puedes intentarlo con otro test
        </Callout.Text>
      </Callout.Root>
    </Flex>
  );
}
