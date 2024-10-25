function extractLinks() {
    const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
    return links.filter(link => link);
  }
  
  chrome.runtime.sendMessage({ type: 'logLinks', url: window.location.href, links: extractLinks() });
  