module.exports = {
  name: 'guus-provider', // Required, the name of this provider and the start of all its URLS
  type: 'provider', // Required, the type of Koop Plugin this is
  version: '1.0.0', // Required, the version of this provider
  Model: require('./model'), // Required contains getData and other functions called by controller
  hosts: false, // Optional, whether or not `getData` should receive a `host` parameter
  disableIdParam: true // Optional, whether or not `getData` should receive an `id` parameter
//   routes: require('./routes'), // Optional, any additional routes that should be handled by this provider
//   Controller: require('./controller'), // Optional, a controller to support unique routes
}