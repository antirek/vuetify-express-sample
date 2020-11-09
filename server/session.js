const redis = require('redis');
const client = redis.createClient();

const session = {
  set: (token, userId) => {
    client.set(token, userId);
  },
  get: (token) => {
    return new Promise((resolve, reject) => {
      client.get(token, (err, data) => {
        resolve(data);
      });
    });
  }
};

module.exports = session;