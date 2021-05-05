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

function TimerMetaDataRepository() {
	this.timerObjectsMapByGuildId = {};
}

/**
 * @typedef TimerMetaData
 * @property {?number} jobId
 * @property {?Date} date
 * @property {?string} description
 * @property {?string} userOrRoleToNotify
 * @property {?number} userOrRoleIdToNotify
 * @property {?Object} scheduledJob
 */

/**
 * @param {number} guildId
 * @param {TimerMetaData} timerMetaData
 */
TimerMetaDataRepository.prototype.addTimerMetadata = function(guildId, timerMetaData) {
	if (!timerMetaData) {
		return;
	}

	this.timerObjectsMapByGuildId[guildId] = this.timerObjectsMapByGuildId[guildId] || {};
	this.timerObjectsMapByGuildId[guildId][timerMetaData.jobId] = timerMetaData;
};
/**
 * @param {number} guildId
 * @param {number} jobId
 */
TimerMetaDataRepository.prototype.deleteTimerMetadata = function(guildId,jobId) {
	delete this.timerObjectsMapByGuildId[guildId][jobId];
};

/**
 *
 * @return {TimerMetaData[]}
 */
TimerMetaDataRepository.prototype.getAllTimerMetadata = function(guildId) {
	return Object.values(this.timerObjectsMapByGuildId[guildId] || {});
};

const timerMetaDataRepository = new TimerMetaDataRepository();

module.exports = timerMetaDataRepository;
