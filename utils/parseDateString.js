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

const moment = require('moment');

// e.g. "1d23h50m60s
const parseDateString = function(dateString) {
	const future = moment.utc();

	const regexp = new RegExp('^(?:(\\d+)d)?(?:(\\d+)h)?(?:(\\d+)m)?(?:(\\d+)s)?$');
	const matches = regexp.exec(dateString);
	if (matches !== null) {
		matches.shift();
		const days = matches[0];
		const hours = matches[1];
		const minutes = matches[2];
		const seconds = matches[3];

		if (days) {
			future.add(parseInt(days),'days');
		}
		if (hours) {
			future.add(parseInt(hours),'hours');
		}
		if (minutes) {
			future.add(parseInt(minutes), 'minutes');
		}
		if (seconds) {
			future.add(parseInt(seconds), 'seconds');
		}

		return future.toDate();
	}

	return null;
};

module.exports = parseDateString;
