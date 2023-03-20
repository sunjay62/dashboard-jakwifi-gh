import React, { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

const Detectobject = () => {
  const webcamRef = useRef(null);
  const [objects, setObjects] = useState([]);

  const detect = async () => {
    const model = await cocossd.load();
    const imageSrc = webcamRef.current.getScreenshot();
    const image = new Image();
    image.src = imageSrc;
    image.onload = async () => {
      const tensor = tf.browser.fromPixels(image);
      const predictions = await model.detect(tensor);
      setObjects(predictions);
    };
  };

  return (
    <div>
      <Webcam ref={webcamRef} />
      <button onClick={detect}>Detect</button>
      {objects.map((object, index) => (
        <div key={index}>
          {object.class} - {object.score}
        </div>
      ))}
    </div>
  );
};

export default Detectobject;
