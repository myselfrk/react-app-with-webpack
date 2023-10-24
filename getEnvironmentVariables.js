const REACT_APP = /^REACT_APP_/i;  // regex to only pick env whose prefix is REACT_APP || if you wish to change it, you can

function getEnvironmentVariables() {
  const raw = Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        PUBLIC_URL: process.env.PUBLIC_URL || "",
        // NODE_ENV: process.env.NODE_ENV || "production",  // will uncomment later
        // we can add other env (which can be defined without prefixing REACT_APP). Avoid exposing any sensitive env variables.
      } 
    );

  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

module.exports = getEnvironmentVariables;