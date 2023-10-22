const unslugify = (slug: string): string => {
  const words = slug.split("-");

  const capitalizeFirstLetter = (word: string, index: number) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word.toLowerCase();
  };

  const capitalizedWords = words.map(capitalizeFirstLetter);

  return capitalizedWords.join(" ");
};

export default unslugify;
