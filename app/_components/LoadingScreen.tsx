import React from "react";
import Image from "next/image";

const LoadingScreen = () => (
  <div className="flex items-center flex-col justify-center">
    <Image src="/imgs/paimon_load.webp" width={50} height={50} alt="loading" />
    <p>Loading...</p>
  </div>
);

export default LoadingScreen;
