import apiGatewayClient from './apiGatewayClient';
import uritemplate from './url-template'

export default class apigClient {

  constructor(config) {
    console.log(config)
    this.config = config;
    if(config === undefined) {
        this.config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        this.config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        this.config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        this.config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        this.config.sessionToken = '';
    }
    if(config.region === undefined) {
        this.config.region = 'us-west-2';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        this.config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        this.config.defaultAcceptType = 'application/json';
    }

    this.invokeUrl = 'https://api.aivibe.com';
    this.endpoint = /(^https?:\/\/[^\/]+)/g.exec(this.invokeUrl)[1];
    this.pathComponent = this.invokeUrl.substring(this.endpoint.length);

    this.sigV4ClientConfig = {
        accessKey: this.config.accessKey,
        secretKey: this.config.secretKey,
        sessionToken: this.config.sessionToken,
        serviceName: 'execute-api',
        region: this.config.region,
        endpoint: this.endpoint,
        defaultContentType: this.config.defaultContentType,
        defaultAcceptType: this.config.defaultAcceptType
    };

    this.authType = 'NONE';
    if (this.sigV4ClientConfig.accessKey !== undefined && this.sigV4ClientConfig.accessKey !== '' && this.sigV4ClientConfig.secretKey !== undefined && this.sigV4ClientConfig.secretKey !== '') {
        this.authType = 'AWS_IAM';
    }

    this.simpleHttpClientConfig = {
       endpoint: this.endpoint,
       defaultContentType: this.config.defaultContentType,
       defaultAcceptType: this.config.defaultAcceptType
   };

   this.apiGatewayClient = new apiGatewayClient(this.simpleHttpClientConfig, this.sigV4ClientConfig);

  }
  assertDefined(object, name) {
      if (object === undefined) {
          throw name + ' must be defined';
      } else {
          return object;
      }
  }

  contains(a, obj) {
      if(a === undefined) { return false;}
      var i = a.length;
      while (i--) {
          if (a[i] === obj) {
              return true;
          }
      }
      return false;
  }

  assertParametersDefined(params, keys, ignore) {
      if (keys === undefined) {
          return;
      }
      if (keys.length > 0 && params === undefined) {
          params = {};
      }
      for (var i = 0; i < keys.length; i++) {
          if(!this.contains(ignore, keys[i])) {
              this.assertDefined(params[keys[i]], keys[i]);
          }
      }
  }

  expand(context) {
      var cache = new CachingContext(context);
      var res = "";
      var i = 0, cnt = this.set.length;
      for (i = 0; i<cnt; i++ ) {
          res += this.set[i].expand(cache);
      }
      return res;
  };

  parseParametersToObject(params, keys) {
      if (params === undefined) {
          return {};
      }
      var object = { };
      for (var i = 0; i < keys.length; i++) {
          object[keys[i]] = params[keys[i]];
      }
      return object;
  }

  eventsGet(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      //this.assertParametersDefined(params, ['categories', 'nextPageId', 'limit', 'minPrice', 'nearbyRadius', 'gps', 'fromTime', 'rEngine', 'toTime', 'maxPrice'], ['body']);

       eventsGetRequest = {
          verb: 'get'.toUpperCase(),
          path: this.pathComponent + '/events',
          //path: this.pathComponent + uritemplate('/events').expand(this.parseParametersToObject(params, [])),
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, ['categories', 'nextPageId', 'limit', 'minPrice', 'nearbyRadius', 'gps', 'fromTime', 'rEngine', 'toTime', 'maxPrice']),
          body: body
      };


      return this.apiGatewayClient.makeRequest(eventsGetRequest, this.authType, additionalParams, this.config.apiKey);
  }


  eventsOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      assertParametersDefined(params, [], ['body']);

       eventsOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: this.pathComponent + uritemplate('/events').expand(this.parseParametersToObject(params, [])),
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(eventsOptionsRequest, this.authType, additionalParams, this.config.apiKey);
  }


  eventsIdGet(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, ['id'], ['body']);

       eventsIdGetRequest = {
          verb: 'get'.toUpperCase(),
          path: this.pathComponent + uritemplate('/events/{id}').expand(parseParametersToObject(params, ['id'])),
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(eventsIdGetRequest, this.authType, additionalParams, this.config.apiKey);
  };


  eventsIdOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, [], ['body']);

       eventsIdOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: this.pathComponent + uritemplate('/events/{id}').expand(this.parseParametersToObject(params, [])),
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(eventsIdOptionsRequest, this.authType, additionalParams, this.config.apiKey);
  };


  fbLoginPost(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, ['body'], ['body']);

       fbLoginPostRequest = {
          verb: 'post'.toUpperCase(),
          path: this.pathComponent + uritemplate('/fb-login').expand(this.parseParametersToObject(params, [])),
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(fbLoginPostRequest, this.authType, additionalParams, this.config.apiKey);
  };


  fbLoginOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, [], ['body']);

       fbLoginOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: this.pathComponent + uritemplate('/fb-login').expand(this.parseParametersToObject(params, [])),
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(fbLoginOptionsRequest, this.authType, additionalParams, this.config.apiKey);
  };


  meGet(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, [], ['body']);

       meGetRequest = {
          verb: 'get'.toUpperCase(),
          path: this.pathComponent + uritemplate('/me').expand(this.parseParametersToObject(params, [])),
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };

      return this.apiGatewayClient.makeRequest(meGetRequest, this.authType, additionalParams, this.config.apiKey);
  };


  meOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, [], ['body']);

       meOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: this.pathComponent + uritemplate('/me').expand(this.parseParametersToObject(params, [])),
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(meOptionsRequest, this.authType, additionalParams, this.config.apiKey);
  };
};
