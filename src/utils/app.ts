const generateAvatar: (name: string) => string = (name) =>
  `https://ui-avatars.com/api/?name=${name}&background=170140&color=fff&bold=true&font-size=0.33`;

const getRandomImageColorIndex: () => number = () => {
  const colorIndex = Math.floor(Math.random() * 10) + 1;

  if (colorIndex === undefined) {
    return getRandomImageColorIndex();
  }

  return colorIndex;
};

const appUtils = {
  generateAvatar,
  getRandomImageColorIndex,
};

export default appUtils;
