const replaceInput = (urlString) => {
  const patterns = [
    /https:\/\/www\.wildberries\.ru\/catalog\/(\d+)\/detail\.aspx/,
    /https:\/\/mpstats\.io\/wb\/item\/(\d+)/,
    /(\d+)/
  ];

  let articles = new Set();

  patterns.forEach((pattern) => {
    const matches = urlString.match(new RegExp(pattern, 'g'));
    if (matches) {
      matches.forEach((match) => {
        const article = match.match(pattern)[1];
        articles.add(article);
      });
    }
  });

  return articles;
};

export default replaceInput;
