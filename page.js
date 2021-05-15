function fetchNews(url, selector, mode = 'full') {
  fetch(url)
  .then(async function (response) {
    const res = await response.json();

    const items = res.items;

    const issues = document.querySelector(selector);
    const fragment = document.createDocumentFragment();

    const title = document.createElement('summary');
    title.innerText = res.title
    title.classList.add('is-6', 'title')
    const lastBuildDate = document.createElement('small');
    lastBuildDate.innerText = new Date(res.lastBuildDate).toLocaleString();
    lastBuildDate.classList.add('ml-3')
    title.appendChild(lastBuildDate)

    const contentWrapper = document.createElement(mode === 'simple' ? 'ol' : 'div');

    fragment.appendChild(title)
    fragment.appendChild(contentWrapper)

    items.forEach(i => {
      let issue = null;

      if (mode === 'simple') {
        issue = document.createElement('li');
        const content = document.createElement('p');
        content.innerHTML = `${i.title} （<a href="${i.link}" target="_blank" title=""></a>）`;
        issue.appendChild(content);
      } else {
        issue = document.createElement('details');
        const h2 = document.createElement('summary');
        const content = document.createElement('div');
        content.classList.add('content', 'my-3', 'p-3', 'notification')
        const timeObj = new Date(i.pubDate);
        h2.innerHTML = `${i.title} （${timeObj.toLocaleTimeString()} <a href="${i.link}" target="_blank" title=""></a>）`;
        content.innerHTML = i.content;

        issue.appendChild(h2);
        issue.appendChild(content);

      }

      
      contentWrapper.appendChild(issue);
    });

    issues.appendChild(fragment);
  })
}

fetchNews('./zaobao.json', '.issues01')
fetchNews('./solidot.json', '.issues02')
fetchNews('./bjnews.json', '.issues03')
fetchNews('./xwlb.json', '.issues04')
fetchNews('./weibo.json', '.issues05', 'simple')
