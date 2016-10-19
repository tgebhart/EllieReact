'use-strict';

export default class simpleHttpClient {

  constructor(config) {
    this.config = config;
    this.endpoint = this.assertDefined(config.endpoint, 'endpoint');

  }
  buildCanonicalQueryString(queryParams) {
      //Build a properly encoded query string from a QueryParam object
      if (Object.keys(queryParams).length < 1) {
          return '';
      }

      var canonicalQueryString = '';
      for (var property in queryParams) {
          if (queryParams.hasOwnProperty(property)) {
              canonicalQueryString += encodeURIComponent(property) + '=' + encodeURIComponent(queryParams[property]) + '&';
          }
      }

      return canonicalQueryString.substr(0, canonicalQueryString.length - 1);
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

  makeRequest(request) {
        var verb = assertDefined(request.verb, 'verb');
        var path = assertDefined(request.path, 'path');
        var queryParams = copy(request.queryParams);
        if (queryParams === undefined) {
            queryParams = {};
        }
        var headers = copy(request.headers);
        if (headers === undefined) {
            headers = {};
        }

        //If the user has not specified an override for Content type the use default
        if(headers['Content-Type'] === undefined) {
            headers['Content-Type'] = config.defaultContentType;
        }

        //If the user has not specified an override for Accept type the use default
        if(headers['Accept'] === undefined) {
            headers['Accept'] = config.defaultAcceptType;
        }

        var body = copy(request.body);
        if (body === undefined) {
            body = '';
        }

        var url = config.endpoint + path;
        var queryString = buildCanonicalQueryString(queryParams);
        if (queryString != '') {
            url += '?' + queryString;
        }
        var simpleHttpRequest = {
            method: verb,
            url: url,
            headers: headers,
            data: body
        };
        return axios(simpleHttpRequest);
    };
};
