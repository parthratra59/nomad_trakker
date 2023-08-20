module.exports = function (webpackEnv) {
    // ... other configuration options ...
  
    return {
      // ... other options ...
  
      resolve: {
        // ... other resolve options ...
  
        fallback: {
          "fs": false,
          "os": false,
          "path": false,
        }
      }
    };
  };
  