// Here we are using CommonJS require so we can dynamically import during build-time
if (process.env.NODE_DEV === "production") {
  module.exports = require("./configureStore.prod");
} else {
  module.exports = require("./ConfigureStore.dev");
}
