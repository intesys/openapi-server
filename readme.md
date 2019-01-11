# Openapi server

It's a simple proxy for development purpose, which allows you to quickly mock responses, in case the real backend server doesn't reply correctly.  
In addition you can validate the responses (both from backend and mock).

## Install

```
npm i https://gitlab.intesys.it/open-source/openapi-server.git
```

You can include it as dependency in your `package.json`:

```js
{
  // ...
  "devDependencies": {
    "openapi-server": "git+https://gitlab.intesys.it/open-source/openapi-server.git"
  }
  // ...
}
```

## Quick start

- run `npm i https://gitlab.intesys.it/open-source/openapi-server.git`
- place a file `api.yml` (openapi v.3, swagger v.2 is also supported) in the root folder of your project
- create a folder `/mocks` in the root folder of your project
- run `npx openapi-server`
- open your browser on `http://localhost:3000/api`

## Use

### From command line

```
npx openapi-server [options]
```

### As package.json script (recommended)

```js
{
  // ...
  "scripts": {
    "api": "openapi-server [options]"
  }
  // ...
}
```

### As express router

```typescript
import { app, router } from 'openapi-server';
import express, { Application, Router } from "express";

// if you want to start server programmatically 
app();

// if you want to configure your server and apply the router
const myApp: Application = express();

(async () => {

  const myRouter: Router = await router();
  myApp.use(myRouter);
  const myServer = myApp.listen();

})();
```

## Configuration

Configure the server in two ways:

### Via `.env` file

Place in the root of you project an `.env.development.local`, `.env.development` or `.env` file, with this variables (feel free to change values) :


```
# api endpoint used by frontend
API_IGNORE_HOST=false
API_PROTOCOL=http
API_HOSTNAME=localhost
API_PORT=3000
API_YML=api.yml
API_PREFIX=/api
RESOURCES_PREFIX=/resources
MOCKS_PATH=/mocks

# backend endpoint used by nginx and proxy
PROXY_PROTOCOL=http
PROXY_HOSTNAME=localhost
PROXY_PORT=3001
PROXY_PREFIX=/api
PROXY_RESOURCES_PREFIX=/resources

# proxy configuration (development only)
SKIP_VALIDATION=false
LOG=false
```

### Via script options

Script options overwrite env variables.  

```
Usage: index [options]

Options:
  -v, --version                     output the version number
  -a,--API_YML [value]              api yml file
  -m,--MOCKS_PATH [value]           mocks path
  -l,--LOG                          enable console log
  -s,--SKIP_VALIDATION              turn off validation
  --API_PREFIX [value]
  --API_PORT [value]
  --API_PROTOCOL [value]
  --API_HOSTNAME [value]
  --RESOURCES_PREFIX [value]
  --PROXY_PROTOCOL [value]
  --PROXY_HOSTNAME [value]
  --PROXY_PORT [value]
  --PROXY_PREFIX [value]
  --PROXY_RESOURCES_PREFIX [value]
  -h, --help                        output usage information
```

### Defaults

API_YML: 'api.yml'  
API_PREFIX: '/api'  
API_PORT: '3000'  
API_PROTOCOL: 'http'  
API_HOSTNAME: 'localhost'  
RESOURCES_PREFIX: '/resources'  
MOCKS_PATH: '/mocks'  

PROXY_PROTOCOL: 'http'  
PROXY_HOSTNAME: 'localhost'  
PROXY_PORT: '3001'  
PROXY_PREFIX: '/api'  
PROXY_RESOURCES_PREFIX: '/resources'  

SKIP_VALIDATION: false  
LOG: false

## Mocks

Mocks are `.json` or `.js` files placed in the `MOCKS_PATH` directory.

Mocks take precedence over proxy, if a mock is found for the requested route, it is server, otherwise the request is proxied to backend.

`Json` files are server as responses, while `js` are required as standard node modules and can contain some logic.

The MOCKS_PATH directory has a sub-folder structure which follows the paths to mock, as example:

```
// api.yml
...
paths:
  /route1:
    post:
      ...
    get:
      ...
  /route1/sub/route:
    get:
      ...
...
```

```
MOCKS_PATH folder:

/mocks
  /route1
    post.json
    get.json
    /sub
      /route
        get.js
```

## How it works

Openapi-server is an express web server with some middleware, it:

- validates the openapi file
- configure routes based on openapi paths
- at every request:
  - looks for a mock (replies with mock if found)
  - proxies the request to the backend server
  - (optional) validates the response

## TO DO

- validate the request
- generate mocks from yml examples
- more tests

### Nice to have

- allow validator to be less restrictive
- allow `js` mocks to export a standard express middleware (and be able to access to req/res)
