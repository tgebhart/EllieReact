import apiGatewayClient from './apiGatewayClient';

export default class apigClient {

  constructor(config) {
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
    if(this.config.accessKey === undefined) {
        this.config.accessKey = '';
    }
    if(this.config.secretKey === undefined) {
        this.config.secretKey = '';
    }
    if(this.config.apiKey === undefined) {
        this.config.apiKey = '';
    }
    if(this.config.sessionToken === undefined) {
        this.config.sessionToken = '';
    }
    if(this.config.region === undefined) {
        this.config.region = 'us-west-2';
    }
    //If defaultContentType is not defined then default to application/json
    if(this.config.defaultContentType === undefined) {
        this.config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(this.config.defaultAcceptType === undefined) {
        this.config.defaultAcceptType = 'application/json';
    }

    this.endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    this.pathComponent = invokeUrl.substring(endpoint.length);
    this.invokeUrl = 'https://t3io12okec.execute-api.us-west-2.amazonaws.com/test';

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
          if(!contains(ignore, keys[i])) {
              assertDefined(params[keys[i]], keys[i]);
          }
      }
  }

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

      assertParametersDefined(params, ['categories', 'nextPageId', 'limit', 'minPrice', 'nearbyRadius', 'gps', 'fromTime', 'rEngine', 'toTime', 'maxPrice'], ['body']);

       eventsGetRequest = {
          verb: 'get'.toUpperCase(),
          path: pathComponent + uritemplate('/events').expand(parseParametersToObject(params, [])),
          headers: parseParametersToObject(params, []),
          queryParams: parseParametersToObject(params, ['categories', 'nextPageId', 'limit', 'minPrice', 'nearbyRadius', 'gps', 'fromTime', 'rEngine', 'toTime', 'maxPrice']),
          body: body
      };


      return apiGatewayClient.makeRequest(eventsGetRequest, authType, additionalParams, this.config.apiKey);
  }


  eventsOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      assertParametersDefined(params, [], ['body']);

       eventsOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: pathComponent + uritemplate('/events').expand(parseParametersToObject(params, [])),
          headers: parseParametersToObject(params, []),
          queryParams: parseParametersToObject(params, []),
          body: body
      };


      return apiGatewayClient.makeRequest(eventsOptionsRequest, authType, additionalParams, this.config.apiKey);
  }


  eventsIdGet(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      assertParametersDefined(params, ['id'], ['body']);

       eventsIdGetRequest = {
          verb: 'get'.toUpperCase(),
          path: pathComponent + uritemplate('/events/{id}').expand(parseParametersToObject(params, ['id'])),
          headers: parseParametersToObject(params, []),
          queryParams: parseParametersToObject(params, []),
          body: body
      };


      return apiGatewayClient.makeRequest(eventsIdGetRequest, authType, additionalParams, this.config.apiKey);
  };


  eventsIdOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      assertParametersDefined(params, [], ['body']);

       eventsIdOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: pathComponent + uritemplate('/events/{id}').expand(parseParametersToObject(params, [])),
          headers: parseParametersToObject(params, []),
          queryParams: parseParametersToObject(params, []),
          body: body
      };


      return apiGatewayClient.makeRequest(eventsIdOptionsRequest, authType, additionalParams, this.config.apiKey);
  };


  fbLoginPost(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      assertParametersDefined(params, ['body'], ['body']);

       fbLoginPostRequest = {
          verb: 'post'.toUpperCase(),
          path: pathComponent + uritemplate('/fb-login').expand(parseParametersToObject(params, [])),
          headers: parseParametersToObject(params, []),
          queryParams: parseParametersToObject(params, []),
          body: body
      };


      return apiGatewayClient.makeRequest(fbLoginPostRequest, authType, additionalParams, this.config.apiKey);
  };


  fbLoginOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      assertParametersDefined(params, [], ['body']);

       fbLoginOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: pathComponent + uritemplate('/fb-login').expand(parseParametersToObject(params, [])),
          headers: parseParametersToObject(params, []),
          queryParams: parseParametersToObject(params, []),
          body: body
      };


      return apiGatewayClient.makeRequest(fbLoginOptionsRequest, authType, additionalParams, this.config.apiKey);
  };


  meGet(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      assertParametersDefined(params, [], ['body']);

       meGetRequest = {
          verb: 'get'.toUpperCase(),
          path: pathComponent + uritemplate('/me').expand(parseParametersToObject(params, [])),
          headers: parseParametersToObject(params, []),
          queryParams: parseParametersToObject(params, []),
          body: body
      };

      return apiGatewayClient.makeRequest(meGetRequest, authType, additionalParams, this.config.apiKey);
  };


  meOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      assertParametersDefined(params, [], ['body']);

       meOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: pathComponent + uritemplate('/me').expand(parseParametersToObject(params, [])),
          headers: parseParametersToObject(params, []),
          queryParams: parseParametersToObject(params, []),
          body: body
      };


      return apiGatewayClient.makeRequest(meOptionsRequest, authType, additionalParams, this.config.apiKey);
  };
};
