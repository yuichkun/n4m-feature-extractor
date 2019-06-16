import ml5 from "ml5";

const featureExtractor = ml5.featureExtractor("MobileNet", {
  numClasses: 4
});

export const buildFeatureExtractor = videoEl => {
  const classifier = featureExtractor.classification(videoEl, () => {
    console.log("Video Ready");
  });
  return classifier;
};
