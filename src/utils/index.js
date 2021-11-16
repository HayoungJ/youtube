export const getDate = () => {
  return new Date().toISOString();
};

export const getRandomVideo = (list, num) => {
  const randomIndex = [];
  for (let i = 0; i < num; i++) {
    const pick = Math.floor(Math.random() * list.length);
    randomIndex.push(pick);
  }
  const randomVideo = list.filter((video, index) =>
    randomIndex.includes(index)
  );
  return randomVideo;
};
