function fetchNews(url, selector) {
  fetch(url)
  .then(async function (response) {
    const res = await response.json();

    const items = res.items;

    const issues = document.querySelector(selector);
    const fragment = document.createDocumentFragment();

    const title = document.createElement('div');
    title.innerText = res.title
    title.classList.add('is-6', 'title')
    const lastBuildDate = document.createElement('small');
    lastBuildDate.innerText = new Date(res.lastBuildDate).toLocaleString();
    lastBuildDate.classList.add('ml-3')
    title.appendChild(lastBuildDate)

    fragment.appendChild(title)

    items.forEach(i => {
      const issue = document.createElement('details');
      const h2 = document.createElement('summary');
      const content = document.createElement('div');
      content.classList.add('box', 'content')
      const timeObj = new Date(i.pubDate);
      h2.innerHTML = `${i.title} （<a href="${i.link}" target="_blank">${timeObj.toLocaleTimeString()}</a>）`;
      content.innerHTML = i.content;

      issue.appendChild(h2);
      issue.appendChild(content);
      fragment.appendChild(issue);
    });

    issues.appendChild(fragment);
  })
}




fetchNews('./zaobao.json', '.issues01')
fetchNews('./solidot.json', '.issues02')
