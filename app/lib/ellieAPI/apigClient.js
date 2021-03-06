import apiGatewayClient from './apiGatewayClient';
import uritemplate from './url-template'

export default class apigClient {

  constructor(config) {
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
        if (params[keys[i]] === undefined) {
          object[keys[i]] = '';
        }
        else {
          object[keys[i]] = params[keys[i]];
        }
      }
      return object;
  }

  eventsGet(params, body, additionalParams) {
      if(additionalParams === undefined) {
        additionalParams = {};
      }
      if (params['limit'] === undefined) {
        // default to 10 events
        params['limit'] = 10
      }

       eventsGetRequest = {
          verb: 'get'.toUpperCase(),
          path: this.pathComponent + '/events',
          //path: this.pathComponent + uritemplate('/events').expand(this.parseParametersToObject(params, [])),
          headers: this.parseParametersToObject(params, []),
          //queryParams: '?categories=&fromTime=&gps=&limit=5&maxPrice=&minPrice=&nearbyRadius=&nextPageId=&rEngine=&toTime="',
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
          path: this.pathComponent + '/events',
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
          path: this.pathComponent + '/events' + this.parseParametersToObject(params, ['id']),
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
          path: this.pathComponent + '/events' + this.parseParametersToObject(params, []),
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(eventsIdOptionsRequest, this.authType, additionalParams, this.config.apiKey);
  };

  eventsBatchGet(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, ['ids'], ['body']);

      var eventsBatchGetRequest = {
          verb: 'get'.toUpperCase(),
          path: this.pathComponent + '/events/batch' + this.parseParametersToObject(params, []),
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, ['ids']),
          body: body
      };


      return this.apiGatewayClient.makeRequest(eventsBatchGetRequest, this.authType, additionalParams, this.config.apiKey);
  };


  uiOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, [], ['body']);

      var uiOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: pathComponent + '/ui',
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(uiOptionsRequest, this.authType, additionalParams, this.config.apiKey);
  };


  uiRecordPut(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      //this.assertParametersDefined(params, ['body'], ['body']);

      var uiRecordPutRequest = {
          verb: 'put'.toUpperCase(),
          path: this.pathComponent + '/ui/record',
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };

      console.log(uiRecordPutRequest)
      return this.apiGatewayClient.makeRequest(uiRecordPutRequest, this.authType, additionalParams, this.config.apiKey);
  };


  uiRecordOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, [], ['body']);

      var uiRecordOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: this.pathComponent + '/ui/record',
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(uiRecordOptionsRequest, this.authType, additionalParams, this.config.apiKey);
  };

  loginPost(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      var loginPostRequest = {
          verb: 'post'.toUpperCase(),
          path: this.pathComponent + '/login' + this.parseParametersToObject(params, []),
          headers: this.parseParametersToObject(params, []),
          queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(loginPostRequest, this.authType, this.additionalParams, this.config.apiKey);
  };


  loginOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      var loginOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: this.pathComponent + '/login' + this.parseParametersToObject(params, []),
          headers: this.parseParametersToObject(params, []),
          queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(loginOptionsRequest, this.authType, this.additionalParams, this.config.apiKey);
  };

  kinesisGet(params, body, additionalParams) {
      if(additionalParams === undefined) {
        additionalParams = {};
      }

      var kinesisGetRequest = {
          verb: 'get'.toUpperCase(),
          path: pathComponent + '/kinesis',
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };

      return this.apiGatewayClient.makeRequest(kinesisGetRequest, this.authType, additionalParams, this.config.apiKey);
  };


  kinesisOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      var kinesisOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: this.pathComponent + '/kinesis',
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(kinesisOptionsRequest, this.authType, additionalParams, this.config.apiKey);
  };


  kinesisStreamNameGet(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, ['stream-name'], ['body']);

      var kinesisStreamNameGetRequest = {
          verb: 'get'.toUpperCase(),
          path: this.pathComponent + '/kinesis/{stream-name}',
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(kinesisStreamNameGetRequest, this.authType, additionalParams, this.config.apiKey);
  };


  kinesisStreamNamePost(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, ['stream-name'], ['body']);

      var kinesisStreamNamePostRequest = {
          verb: 'post'.toUpperCase(),
          path: this.pathComponent + '/kinesis/{stream-name}',
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(kinesisStreamNamePostRequest, this.authType, additionalParams, this.config.apiKey);
  };


  kinesisStreamNameDelete(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, ['stream-name'], ['body']);

      var kinesisStreamNameDeleteRequest = {
          verb: 'delete'.toUpperCase(),
          path: this.pathComponent + '/kinesis/{stream-name}',
          headers: this.parseParametersToObject(params, []),
          queryParams: tgis.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(kinesisStreamNameDeleteRequest, this.authType, additionalParams, this.config.apiKey);
  };


  kinesisStreamNameOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, [], ['body']);

      var kinesisStreamNameOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: this.pathComponent + '/kinesis/{stream-name}',
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(kinesisStreamNameOptionsRequest, this.authType, additionalParams, this.config.apiKey);
  };


  kinesisStreamNameRecordPut(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, ['stream-name'], ['body']);

      var kinesisStreamNameRecordPutRequest = {
          verb: 'put'.toUpperCase(),
          path: this.pathComponent + '/kinesis/{stream-name}/record',
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(kinesisStreamNameRecordPutRequest, this.authType, additionalParams, this.config.apiKey);
  };


  kinesisStreamNameRecordOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, [], ['body']);

      var kinesisStreamNameRecordOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: this.pathComponent + '/kinesis/{stream-name}/record',
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(kinesisStreamNameRecordOptionsRequest, this.authType, additionalParams, this.config.apiKey);
  };


  kinesisStreamNameRecordsGet(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, ['stream-name', 'Shard-Iterator'], ['body']);

      var kinesisStreamNameRecordsGetRequest = {
          verb: 'get'.toUpperCase(),
          path: this.pathComponent + '/kinesis/{stream-name}/records',
          headers: this.parseParametersToObject(params, ['Shard-Iterator']),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(kinesisStreamNameRecordsGetRequest, this.authType, additionalParams, this.config.apiKey);
  };


  kinesisStreamNameRecordsPut(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, ['stream-name'], ['body']);

      var kinesisStreamNameRecordsPutRequest = {
          verb: 'put'.toUpperCase(),
          path: this.pathComponent + '/kinesis/{stream-name}/records',
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(kinesisStreamNameRecordsPutRequest, this.authType, additionalParams, this.config.apiKey);
  };


  kinesisStreamNameRecordsOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, [], ['body']);

      var kinesisStreamNameRecordsOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: this.pathComponent + '/kinesis/{stream-name}/records',
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(kinesisStreamNameRecordsOptionsRequest, this.authType, additionalParams, this.config.apiKey);
  };


  kinesisStreamNameSharditeratorGet(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, ['stream-name', 'shard-id'], ['body']);

      var kinesisStreamNameSharditeratorGetRequest = {
          verb: 'get'.toUpperCase(),
          path: this.pathComponent + '/kinesis/{stream-name}/sharditerator',
          queryParams: this.parseParametersToObject(params, ['shard-id']),
          body: body
      };


      return this.apiGatewayClient.makeRequest(kinesisStreamNameSharditeratorGetRequest, this.authType, additionalParams, this.config.apiKey);
  };


  kinesisStreamNameSharditeratorOptions(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, [], ['body']);

      var kinesisStreamNameSharditeratorOptionsRequest = {
          verb: 'options'.toUpperCase(),
          path: this.pathComponent + '/kinesis/{stream-name}/sharditerator',
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(kinesisStreamNameSharditeratorOptionsRequest, this.authType, additionalParams, this.config.apiKey);
  };



  fbLoginPost(params, body, additionalParams) {
      if(additionalParams === undefined) { additionalParams = {}; }

      this.assertParametersDefined(params, ['body'], ['body']);

       fbLoginPostRequest = {
          verb: 'post'.toUpperCase(),
          path: this.pathComponent + '/fb-login',
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
          path: this.pathComponent + '/fb-login',
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
          path: this.pathComponent + '/me',
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
          path: this.pathComponent + '/me',
          headers: this.parseParametersToObject(params, []),
          queryParams: this.parseParametersToObject(params, []),
          body: body
      };


      return this.apiGatewayClient.makeRequest(meOptionsRequest, this.authType, additionalParams, this.config.apiKey);
  };

  meDislikesGet(params, body, additionalParams) {
    if(additionalParams === undefined) { additionalParams = {}; }

    this.assertParametersDefined(params, [], ['body']);

    var meDislikesGetRequest = {
        verb: 'get'.toUpperCase(),
        path: this.pathComponent + '/me/dislikes',
        headers: this.parseParametersToObject(params, []),
        queryParams: this.parseParametersToObject(params, []),
        body: body
    };


    return this.apiGatewayClient.makeRequest(meDislikesGetRequest, this.authType, additionalParams, this.config.apiKey);
  };


  meLikesGet(params, body, additionalParams) {
    if(additionalParams === undefined) { additionalParams = {}; }

    this.assertParametersDefined(params, [], ['body']);

    var meLikesGetRequest = {
        verb: 'get'.toUpperCase(),
        path: this.pathComponent + '/me/likes',
        headers: this.parseParametersToObject(params, []),
        queryParams: this.parseParametersToObject(params, []),
        body: body
    };


    return this.apiGatewayClient.makeRequest(meLikesGetRequest, this.authType, additionalParams, this.config.apiKey);
  };

};
