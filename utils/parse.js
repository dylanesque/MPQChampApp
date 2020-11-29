function parseFeeds(data) {
  if (data === 'none') {
    return;
  } else if (!data.includes(',')) {
    return [parseInt(data)];
  } else {
    return [data.split(',')];
  }
}

export default parseFeeds;
