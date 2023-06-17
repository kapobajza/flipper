/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/*[object Object]*/
import {Base64} from 'js-base64';
import {Header} from '../types';
import {decodeBody} from '../utils';

describe('Decoding response body using Brotli', () => {
  const brotliResHeaders: Header[] = [{key: 'Content-Encoding', value: 'br'}];

  test('decodes object', () => {
    const stringifiedObj = JSON.stringify({foo: 'bar'});
    const encodedObj = Base64.encode(stringifiedObj);
    const decodedBody = decodeBody(brotliResHeaders, encodedObj);

    expect(decodedBody).toEqual(stringifiedObj);
  });

  test('decodes array of objects', () => {
    const stringifiedArray = JSON.stringify([{foo: 'bar'}, {bar: 'baz'}]);
    const encodedObj = Base64.encode(stringifiedArray);
    const decodedBody = decodeBody(brotliResHeaders, encodedObj);

    expect(decodedBody).toEqual(stringifiedArray);
  });
});
