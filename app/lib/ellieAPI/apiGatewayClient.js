'use-strict';

import sigV4Client from './sigV4Client';
import simpleHttpClient from './simpleHttpClient';

export default class apiGatewayClient {

  constructor(simpleHttpClientConfig, sigV4ClientConfig) {
    this.simpleHttpClientConfig = simpleHttpClientConfig;
    this.sigV4ClientConfig = sigV4ClientConfig;

    //Spin up 2 httpClients, one for simple requests, one for SigV4
    this.sigV4Client = new sigV4Client(this.sigV4ClientConfig);
    this.simpleHttpClient = new simpleHttpClient(this.simpleHttpClientConfig);
  }

  mergeInto(baseObj, additionalProps) {
      if (null == baseObj || "object" != typeof baseObj) return baseObj;
      var merged = baseObj.constructor();
      for (var attr in baseObj) {
          if (baseObj.hasOwnProperty(attr)) merged[attr] = baseObj[attr];
      }
      if (null == additionalProps || "object" != typeof additionalProps) return baseObj;
      for (attr in additionalProps) {
          if (additionalProps.hasOwnProperty(attr)) merged[attr] = additionalProps[attr];
      }
      return merged;
  }

  makeRequest(request, authType, additionalParams, apiKey) {
      //Default the request to use the simple http client
      var clientToUse = simpleHttpClient;

      //Attach the apiKey to the headers request if one was provided
      if (apiKey !== undefined && apiKey !== '' && apiKey !== null) {
          request.headers['x-api-key'] = apiKey;
      }

      if (request.body === undefined || request.body === '' || request.body === null || Object.keys(request.body).length === 0) {
          request.body = undefined;
      }

      // If the user specified any additional headers or query params that may not have been modeled
      // merge them into the appropriate request properties
      request.headers = mergeInto(request.headers, additionalParams.headers);
      request.queryParams = mergeInto(request.queryParams, additionalParams.queryParams);

      //If an auth type was specified inject the appropriate auth client
      if (authType === 'AWS_IAM') {
          clientToUse = sigV4Client;
      }

      //Call the selected http client to make the request, returning a promise once the request is sent
      return clientToUse.makeRequest(request);
    }
}
