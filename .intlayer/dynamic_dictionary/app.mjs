const content = {
  'zh-Hans': () => import('./app.zh-Hans.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'en': () => import('./app.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ja': () => import('./app.ja.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
