const timeAgo = (date) => {
    const now = new Date();
    const updatedAt = new Date(date);
    const differenceInSeconds = Math.floor((now - updatedAt) / 1000);
  
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hr', seconds: 3600 },
      { label: 'min', seconds: 60 },
      { label: 'sec', seconds: 1 }
    ];
  
    for (let interval of intervals) {
      const count = Math.floor(differenceInSeconds / interval.seconds);
      if (count >= 1) {
        return count === 1 ? `1 ${interval.label} ago` : `${count} ${interval.label}s ago`;
      }
    }
    return 'just now';
  };

export default timeAgo;