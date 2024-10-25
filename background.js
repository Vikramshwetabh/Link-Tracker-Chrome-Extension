chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ visitedSites: [] });
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
      });
    }
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'logLinks') {
      chrome.storage.local.get(['visitedSites'], (result) => {
        let visitedSites = result.visitedSites || [];
        let site = visitedSites.find(site => site.url === request.url);
        if (!site) {
          site = { url: request.url, links: [] };
          visitedSites.push(site);
        }
        request.links.forEach(link => {
          let existingLink = site.links.find(l => l.url === link);
          if (existingLink) {
            existingLink.count += 1;
          } else {
            site.links.push({ url: link, count: 1 });
          }
        });
        chrome.storage.local.set({ visitedSites: visitedSites });
        sendResponse({ status: 'success' });
      });
    }
    return true;
  });
  