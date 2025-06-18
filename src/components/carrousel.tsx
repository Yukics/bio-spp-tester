"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Flex } from "@radix-ui/themes";
import { useSwipeable } from "react-swipeable";

const imageStyle: React.CSSProperties = {
  borderRadius: "0.5%",
  border: "1px solid #ffffff",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
//   objectFit: "cover",
  width: "100%",
  height: "100%"
};

interface CarrouselProps {
  imageList: string[];
  testName: string;
}

export default function Carrousel(props: CarrouselProps) {
  const { imageList, testName } = props;
  console.log("Carrousel props:", props);

  const [currentImage, setCurrentImage] = useState(imageList[0]);
  useEffect(() => {}, [imageList, currentImage]);

  function changeImage(direction: "next" | "prev") {
    const currentIndex = imageList.indexOf(currentImage);
    let newIndex = currentIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % imageList.length;
    } else if (direction === "prev") {
      newIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    }

    setCurrentImage(imageList[newIndex]);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => changeImage("next"),
    onSwipedRight: () => changeImage("prev"),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div {...handlers}>
      <Flex height={"46vh"} width={"90vw"}>
        <Image
          src={encodeURI(`/${testName}/img/${currentImage}`)}
          alt="Species photo"
          style={imageStyle}
        //   objectFit="cover"
          // layout="fill"
          priority
          width={"2000"}
          height={"2000"}
        />
      </Flex>
    </div>
  );
}
