/*
 * MIT License
 *
 * Copyright (c) 2021 John Nahlen
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

function UserTimeZoneRepository() {
	this.userTimeZoneMap = {};
}

/**
 *
 * @param {number} userId
 * @param {?string} timeZone
 */
UserTimeZoneRepository.prototype.setUserTimeZone = function(userId,timeZone) {
	this.userTimeZoneMap[userId] = timeZone;
};

/**
 *
 * @param {number} userId
 * @return {?string}
 */
UserTimeZoneRepository.prototype.getUserTimeZone = function(userId) {
	return this.userTimeZoneMap[userId];
};

/**
 *
 * @param {number} userId
 */
UserTimeZoneRepository.prototype.deleteUserTimeZone = function(userId) {
	delete this.userTimeZoneMap[userId];
};

UserTimeZoneRepository.prototype.clearUserTimeZones = function() {
	this.userTimeZoneMap = {};
};

const userTimeZoneRepository = new UserTimeZoneRepository();
module.exports = userTimeZoneRepository;
