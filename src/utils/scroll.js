export const scrollObserver = (ref, callback) => {
  const observer = new IntersectionObserver(callback);
  observer.observe(ref);
};
