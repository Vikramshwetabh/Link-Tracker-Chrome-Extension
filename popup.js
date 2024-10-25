document.addEventListener('DOMContentLoaded', function() {
    const statsDiv = document.getElementById('stats');
    const showMoreButton = document.getElementById('showMore');
  
    chrome.storage.local.get(['visitedSites'], (result) => {
      const visitedSites = result.visitedSites || [];
      const totalSites = visitedSites.length;
      const totalLinks = visitedSites.reduce((acc, site) => acc + site.links.length, 0);
  
      statsDiv.innerHTML = `<p>Total Sites: ${totalSites}</p><p>Total Links: ${totalLinks}</p>`;
    });
  
    showMoreButton.addEventListener('click', () => {
      chrome.tabs.create({ url: 'details.html' });
    });
  });
  