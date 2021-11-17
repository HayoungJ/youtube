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

export const getHtmlString = (text) => {
  const parser = new DOMParser();
  const htmlText = parser
    .parseFromString(text, 'text/html')
    .getElementsByTagName('body')[0].textContent;
  return htmlText;
};

export const resetScroll = () => {
  window.scrollTo({
    top: 0,
  });
};
