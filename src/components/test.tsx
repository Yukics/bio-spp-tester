"use client";

import { useState, useEffect } from "react";
import FinishedTest from "@/components/finishedTest";
import Carrousel from "@/components/carrousel";
import {
  Button,
  Flex,
  Separator,
  TextField,
  ScrollArea,
} from "@radix-ui/themes";
import { BookmarkIcon } from "@radix-ui/react-icons";
import Puntuacion from "@/components/puntuacion";

interface TestProps {
  testName: string;
}

export default function Test(props: TestProps) {
  const { testName } = props;

  const [currentTest, setCurrentTest] = useState<Element[]>([]);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [currentProgress, setCurrentProgress] = useState<number[]>([]);
  const [currentPosElement, setCurrentPosElement] = useState<number>();
  const [remainingPosElements, setRemainingPosElements] = useState<number[]>(
    []
  );
  const [respuesta, setRespuesta] = useState("");
  const [pistas, setPistas] = useState(1);
  const [puntuacion, setPuntuacion] = useState(10);
  const [puntuacionTotal, setPuntuacionTotal] = useState(0);
  const maxPuntuacion = currentTest.length * 10;

  useEffect(() => {
    if (currentTest.length === 0) {
      fetch(
        `${window.location.protocol}//${window.location.host}/api/test?name=${testName}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCurrentTest(data);
          const position = Math.floor(Math.random() * currentTest.length);
          setCurrentPosElement(position);
          setCurrentImages(data[position]?.imagenes || ["fallback.png"]);
          setRemainingPosElements(generarRemainingPosElements(data));
        });
    }
  }, [currentImages, currentProgress, currentPosElement]);

  function generarRemainingPosElements(data: Element[]) {
    const remaining = [];
    for (let i = 0; i < data.length; i++) {
      remaining.push(i);
    }
    return remaining;
  }

  function generarPista() {
    const respondido = respuesta.length;

    const isReponseMatching = currentTest[currentPosElement]?.nombre.substring(
      0,
      respondido - 1
    );

    if (
      respuesta.toLowerCase() ===
      currentTest[currentPosElement]?.nombre.toLowerCase()
    ) {
      return;
    }

    if (isReponseMatching !== respuesta.substring(0, respondido - 1)) {
      setRespuesta(currentTest[currentPosElement]?.nombre.substring(0, 3));
      return;
    }

    if (respondido === 0) {
      setRespuesta(currentTest[currentPosElement]?.nombre.substring(0, 3));
    } else {
      setRespuesta(
        currentTest[currentPosElement]?.nombre.substring(0, respondido + 2)
      );
    }
    setPistas(pistas + 1);
    if (puntuacion > 3) {
      setPuntuacion(puntuacion - 3);
    }
    return;
  }

  function changeElement() {
    const new_progress = currentProgress.concat(currentPosElement);

    const index = remainingPosElements.indexOf(currentPosElement);
    if (index !== -1) {
      remainingPosElements.splice(index, 1);
      setRemainingPosElements(remainingPosElements);
    }
    console.log(new_progress, index, remainingPosElements);

    if (remainingPosElements.length > 0) {
      const new_currentPosElement =
        remainingPosElements[
          Math.floor(Math.random() * remainingPosElements.length)
        ];
      setCurrentPosElement(new_currentPosElement);
      setCurrentImages(currentTest[new_currentPosElement]?.imagenes);
    }

    setCurrentProgress(new_progress);
    setRespuesta("");
    setPistas(1);
    setPuntuacionTotal(puntuacionTotal + puntuacion);
  }

  if (
    currentProgress.length >= currentTest.length &&
    currentTest.length !== 0
  ) {
    return (
      <FinishedTest
        selectedTest={testName}
        puntuacion={puntuacionTotal}
        maxPuntuacion={maxPuntuacion}
      />
    );
  } else if (currentTest.length !== 0 && currentPosElement !== undefined) {
    return (
      <>
        <style>
          {`
        @keyframes horizontalShaking {
          0% { transform: translateX(0) }
          25% { transform: translateX(5px) }
          50% { transform: translateX(-5px) }
          75% { transform: translateX(5px) }
          100% { transform: translateX(0) }
          }
          `}
        </style>
        <Flex
          style={{ width: "100%" }}
          align={"center"}
          direction={"column"}
          gap={"4"}
        >
          <Puntuacion
            currentProgress={[currentProgress.length, currentTest.length]}
            puntuacion={puntuacionTotal}
          />
          {currentImages.length > 0 && (
            <Carrousel
              imageList={currentImages}
              testName={testName}
              key={currentPosElement}
            />
          )}
          <Flex direction={"column"} gap="6" width={"90vw"} pt={"6"}>
            <TextField.Root
              autoFocus
              size="3"
              placeholder={currentTest[currentPosElement]?.familia}
              // placeholder="Respuesta"
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
            />
            <Separator size="4" />
            {respuesta.toLowerCase() ===
            currentTest[currentPosElement]?.nombre.toLowerCase() ? (
              <Button
                autoFocus
                variant="soft"
                color="green"
                className="horizontalShaking"
                onClick={() => changeElement()}
                onKeyPress={(e) => {
                  if (e.key === "Enter") changeElement();
                }}
              >
                Siguiente
              </Button>
            ) : (
              <Button
                variant="soft"
                onClick={() => {
                  generarPista();
                }}
              >
                <BookmarkIcon />
                Pista {pistas}
              </Button>
            )}
            {currentProgress.length > 0 && (
              <ScrollArea
                type="always"
                scrollbars="vertical"
                style={{ height: "14vh" }}
              >
                {currentProgress.map((element: number, index: number) => (
                  <p style={{textAlign: "center"}} key={index}>{currentTest[element]?.nombre}</p>
                ))}
              </ScrollArea>
            )}
          </Flex>
        </Flex>
      </>
    );
  }
}
