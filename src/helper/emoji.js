export const getEmoji = expression => {
  return {
    angry: "😡",
    disgusted: "🤢",
    fearful: "😰",
    happy: "😄",
    neutral: "😐",
    sad: "😭",
    surprised: "😱",
  }[expression];
};
