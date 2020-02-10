// Copyright 2008 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.module('goog.testing.MockRangeTest');
goog.setTestOnly();

const MockRange = goog.require('goog.testing.MockRange');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  /**
   * Tests that a MockRange can be created successfully, a call to a mock
   * method can be recorded, and the correct behavior replayed and verified.
   */
  testMockMethod() {
    const mockRange = new MockRange();
    mockRange.getStartOffset().$returns(42);
    mockRange.$replay();

    assertEquals(
        'Mock method should return recorded value', 42,
        mockRange.getStartOffset());
    mockRange.$verify();
  },
});
