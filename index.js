let Parser = require('rss-parser');
let parser = new Parser({
    // 30 秒后取消请求
    timeout: 30000
});
const fs = require('fs/promises');
const process = require('process');

async function main() {
    let [zaobaoFeed, reutersFeed, solidotFeed] = await Promise.all([
      parser.parseURL('https://rsshub.app/zaobao/realtime/china'),
      parser.parseURL('https://rsshub.app/reuters/channel/cn/analyses'),
      parser.parseURL('https://rsshub.app/solidot/www')
    ]);

    console.log(`successfully generating new feed.`);

    await fs.rmdir('./dist', { recursive: true });
    console.log(`successfully deleted ./dist`);

    await fs.mkdir('./dist');
    console.log(`successfully create ./dist`);

    await fs.writeFile('./dist/zaobao.json', JSON.stringify(zaobaoFeed));
    await fs.writeFile('./dist/solidot.json', JSON.stringify(solidotFeed));
    await fs.writeFile('./dist/reuters.json', JSON.stringify(reutersFeed));
    console.log(`successfully write zaobao.json, solidot.json, reuters.json`);

    await fs.copyFile('./template/index.html', `./dist/index.html`);
    await fs.copyFile('./template/page.js', `./dist/page.js`);
    console.log(`successfully copy asset files`);

}

main()
.catch(err => {
  console.log(err);
  process.exit(1);
});
