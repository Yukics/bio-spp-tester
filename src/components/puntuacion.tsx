"use client";
import { Callout } from "@radix-ui/themes";
import { Button, Flex } from "@radix-ui/themes";

export default function Puntuacion(props: any) {
  const { puntuacion, currentProgress } = props;
  return (
    <Flex width={"90vw"}justify={"center"}>
      <Callout.Root color="green" size="3">
        <Callout.Text style={{ fontSize: "1.2rem", textAlign: "center" }}>
          {puntuacion} de {currentProgress[1] * 10} pts.
        </Callout.Text>
      </Callout.Root>
    </Flex>
  );
}
