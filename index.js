let Parser = require('rss-parser');
let parser = new Parser({
    // 30 秒后取消请求
    timeout: 30000
});
const fs = require('fs/promises');
const process = require('process');


async function main() {
    const url = 'https://rsshub.app/zaobao/realtime/china';

    let feed = await parser.parseURL(url);

    console.log(`successfully generating new feed.`);

    await fs.rmdir('./dist', { recursive: true });
    console.log(`successfully deleted ./dist`);

    await fs.mkdir('./dist');
    console.log(`successfully create ./dist`);

    await fs.writeFile('./dist/rss.json', JSON.stringify(feed));
    console.log(`successfully write rss.json`);

    await fs.copyFile('./template/index.html', `./dist/index.html`);
    await fs.copyFile('./template/page.js', `./dist/page.js`);
    console.log(`successfully copy asset files`);

}

main()
.catch(err => {
  console.log(err);
  process.exit(1);
});
