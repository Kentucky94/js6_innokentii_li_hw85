const path = require('path');

const rootPath = __dirname;

module.exports = {
  database: 'mongodb://localhost/musicApp',
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  port: 8080,
  rootPath,
  uploadPath: path.join(rootPath, 'public', 'uploads'),
  uploadAvatarPath: path.join(rootPath, 'public', 'uploads', 'avatar'),
  facebookAccess: '262652934739222',
  facebookSecret: '5171acbfb5183abdc4f5acb4f0d64dde',
};