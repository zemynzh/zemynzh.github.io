const content = {
  'zh-Hans': () => Promise.resolve(require('./app.zh-Hans.json')),
  'en': () => Promise.resolve(require('./app.en.json')),
  'ja': () => Promise.resolve(require('./app.ja.json'))
};
module.exports = content;
