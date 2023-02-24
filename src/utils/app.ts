const generateAvatar: (name: string) => string = (name) =>
  `https://ui-avatars.com/api/?name=${name}&background=170140&color=fff&bold=true&font-size=0.33`;

const appUtils = {
  generateAvatar,
};

export default appUtils;
