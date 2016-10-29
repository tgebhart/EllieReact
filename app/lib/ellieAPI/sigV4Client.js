'use-strict';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import React from 'react'

export default class sigV4Client {

  constructor(config) {
    this.config = config;
    this.AWS_SHA_256 = 'AWS4-HMAC-SHA256';
    this.AWS4_REQUEST = 'aws4_request';
    this.AWS4 = 'AWS4';
    this.X_AMZ_DATE = 'x-amz-date';
    this.X_AMZ_SECURITY_TOKEN = 'x-amz-security-token';
    this.HOST = 'host';
    this.AUTHORIZATION = 'Authorization';
    this.HOSTNAME = 'api.aivibe.com';

    this.awsSigV4Client = { };

    this.awsSigV4Client.accessKey = this.assertDefined(this.config.accessKey, 'accessKey');
    this.awsSigV4Client.secretKey = this.assertDefined(this.config.secretKey, 'secretKey');
    this.awsSigV4Client.sessionToken = this.config.sessionToken;
    this.awsSigV4Client.serviceName = this.assertDefined(this.config.serviceName, 'serviceName');
    this.awsSigV4Client.region = this.assertDefined(this.config.region, 'region');
    this.awsSigV4Client.endpoint = this.assertDefined(this.config.endpoint, 'endpoint');
  }

  assertDefined(object, name) {
      if (object === undefined) {
          throw name + ' must be defined';
      } else {
          return object;
      }
  }

  copy(obj) {
      if (null == obj || "object" != typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
      return copy;
  }

  hash(value) {
      return CryptoJS.SHA256(value);
  }

  hexEncode(value) {
      return value.toString(CryptoJS.enc.Hex);
  }

  hmac(secret, value) {
      return CryptoJS.HmacSHA256(value, secret, {asBytes: true});
  }

  buildCanonicalRequest(method, path, queryParams, headers, payload) {
      return method + '\n' +
          this.buildCanonicalUri(path) + '\n' +
          this.buildCanonicalQueryString(queryParams) + '\n' +
          this.buildCanonicalHeaders(headers) + '\n' +
          this.buildCanonicalSignedHeaders(headers) + '\n' +
          this.hexEncode(this.hash(payload));
  }

  hashCanonicalRequest(request) {
      return this.hexEncode(this.hash(request));
  }

  buildCanonicalUri(uri) {
      return encodeURI(uri);
  }

  buildCanonicalQueryString(queryParams) {
    if (Object.keys(queryParams).length < 1) {
        return '';
    }

    var sortedQueryParams = [];
    for (var property in queryParams) {
        if (queryParams.hasOwnProperty(property)) {
            sortedQueryParams.push(property);
        }
    }
    sortedQueryParams.sort();

    var canonicalQueryString = '';
    for (var i = 0; i < sortedQueryParams.length; i++) {
        canonicalQueryString += sortedQueryParams[i] + '=' + encodeURIComponent(queryParams[sortedQueryParams[i]]) + '&';
    }
    return canonicalQueryString.substr(0, canonicalQueryString.length - 1);
  }

  buildCanonicalHeaders(headers) {
    var canonicalHeaders = '';
    var sortedKeys = [];
    for (var property in headers) {
        if (headers.hasOwnProperty(property)) {
            sortedKeys.push(property);
        }
    }
    sortedKeys.sort();

    for (var i = 0; i < sortedKeys.length; i++) {
        canonicalHeaders += sortedKeys[i].toLowerCase() + ':' + headers[sortedKeys[i]] + '\n';
    }
    return canonicalHeaders;
  }

  buildCanonicalSignedHeaders(headers) {
    var sortedKeys = [];
    for (var property in headers) {
        if (headers.hasOwnProperty(property)) {
            sortedKeys.push(property.toLowerCase());
        }
    }
    sortedKeys.sort();

    return sortedKeys.join(';');
  }

  buildStringToSign(datetime, credentialScope, hashedCanonicalRequest) {
    return this.AWS_SHA_256 + '\n' +
          datetime + '\n' +
          credentialScope + '\n' +
          hashedCanonicalRequest;
  }

  buildCredentialScope(datetime, region, service) {
    return datetime.substr(0, 8) + '/' + region + '/' + service + '/' + this.AWS4_REQUEST
  }

  calculateSigningKey(secretKey, datetime, region, service) {
    return this.hmac(this.hmac(this.hmac(this.hmac(this.AWS4 + secretKey, datetime.substr(0, 8)), region), service), this.AWS4_REQUEST);
  }

  calculateSignature(key, stringToSign) {
    return this.hexEncode(this.hmac(key, stringToSign));
  }

  buildAuthorizationHeader(accessKey, credentialScope, headers, signature) {
    return this.AWS_SHA_256 + ' Credential=' + accessKey + '/' + credentialScope + ', SignedHeaders=' + this.buildCanonicalSignedHeaders(headers) + ', Signature=' + signature;
  }

  makeRequest(request) {
    var verb = this.assertDefined(request.verb, 'verb');
    var path = this.assertDefined(request.path, 'path');
    var queryParams = this.copy(request.queryParams);
    if (queryParams === undefined) {
        queryParams = {};
    }
    var headers = this.copy(request.headers);
    if (headers === undefined) {
        headers = {};
    }

    //If the user has not specified an override for Content type the use default
    if(headers['Content-Type'] === undefined) {
        headers['Content-Type'] = this.config.defaultContentType;
    }

    //If the user has not specified an override for Accept type the use default
    if(headers['Accept'] === undefined) {
        headers['Accept'] = this.config.defaultAcceptType;
    }

    var body = this.copy(request.body);
    if (body === undefined || verb === 'GET') { // override request body and set to empty when signing GET requests
        body = '';
    }  else {
        body = JSON.stringify(body);
    }

    //If there is no body remove the content-type header so it is not included in SigV4 calculation
    if(body === '' || body === undefined || body === null) {
        delete headers['Content-Type'];
    }

    var datetime = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z').replace(/[:\-]|\.\d{3}/g, '');
    headers[this.X_AMZ_DATE] = datetime;
    var parser = React.createElement('a', {href: this.awsSigV4Client.endpoint});
    // parser.href = this.awsSigV4Client.endpoint;
    headers[this.HOST] = this.HOSTNAME;

    var canonicalRequest = this.buildCanonicalRequest(verb, path, queryParams, headers, body);
    var hashedCanonicalRequest = this.hashCanonicalRequest(canonicalRequest);
    var credentialScope = this.buildCredentialScope(datetime, this.awsSigV4Client.region, this.awsSigV4Client.serviceName);
    var stringToSign = this.buildStringToSign(datetime, credentialScope, hashedCanonicalRequest);
    var signingKey = this.calculateSigningKey(this.awsSigV4Client.secretKey, datetime, this.awsSigV4Client.region, this.awsSigV4Client.serviceName);
    var signature = this.calculateSignature(signingKey, stringToSign);
    headers[this.AUTHORIZATION] = this.buildAuthorizationHeader(this.awsSigV4Client.accessKey, credentialScope, headers, signature);
    if(this.awsSigV4Client.sessionToken !== undefined && this.awsSigV4Client.sessionToken !== '') {
        headers[this.X_AMZ_SECURITY_TOKEN] = this.awsSigV4Client.sessionToken;
    }
    delete headers[this.HOST];

    var url = this.config.endpoint + path;
    var queryString = this.buildCanonicalQueryString(queryParams);
    if (queryString != '') {
        url += '?' + queryString;
    }

    //Need to re-attach Content-Type if it is not specified at this point
    if(headers['Content-Type'] === undefined) {
        headers['Content-Type'] = this.config.defaultContentType;
    }

    var signedRequest = {
        method: verb,
        url: url,
        headers: headers,
        data: body
    };
    return axios(signedRequest);
  };

}
