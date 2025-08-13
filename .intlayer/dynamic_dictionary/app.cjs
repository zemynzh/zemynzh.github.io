const content = {
  'zh-Hans': () => Promise.resolve(require('./app.zh-Hans.json.cjs')),
  'en': () => Promise.resolve(require('./app.en.json.cjs')),
  'ja': () => Promise.resolve(require('./app.ja.json.cjs'))
};
module.exports = content;
