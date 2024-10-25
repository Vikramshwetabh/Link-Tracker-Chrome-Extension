document.addEventListener('DOMContentLoaded', function() {
    const detailsBody = document.getElementById('detailsBody');
  
    chrome.storage.local.get(['visitedSites'], (result) => {
      const visitedSites = result.visitedSites || [];
  
      visitedSites.forEach(site => {
        site.links.forEach(link => {
          const row = document.createElement('tr');
          const siteCell = document.createElement('td');
          const linkCell = document.createElement('td');
          const countCell = document.createElement('td');
  
          siteCell.textContent = site.url;
          linkCell.textContent = link.url;
          countCell.textContent = link.count;
  
          row.appendChild(siteCell);
          row.appendChild(linkCell);
          row.appendChild(countCell);
          detailsBody.appendChild(row);
        });
      });
    });
  });
  