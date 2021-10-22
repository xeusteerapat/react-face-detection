import React from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

function App() {
  const ref = React.useRef();
  const [result, setResult] = React.useState("no expression detect");

  React.useEffect(() => {
    const fetchModel = async () => {
      try {
        await Promise.all([
          faceapi.loadFaceDetectionModel("/models"),
          faceapi.loadFaceExpressionModel("/models"),
          faceapi.loadFaceLandmarkModel("/models"),
          faceapi.loadFaceRecognitionModel("/models"),
        ]);

        const detectFace = await faceapi
          .detectSingleFace(ref.current.video)
          .withFaceExpressions();

        if (!detectFace) {
          setResult("model load failed");
        }

        const { expressions } = detectFace;
        const currentExpression = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );

        setResult(currentExpression);
      } catch (error) {
        console.log(error);
      }
    };

    const intervalId = setInterval(() => {
      fetchModel();
    }, 2000);

    return () => {
      return clearInterval(intervalId);
    };
  }, []);
  return (
    <div>
      <h1>Hi</h1>
      <Webcam ref={ref} />
      <div>
        <h2>{result}</h2>
      </div>
    </div>
  );
}

export default App;
