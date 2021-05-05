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

function TimerMetaData() {
	/**
	 * @private
	 * @type {?number}
	 */
	this.discordGuildId = null;
	/**
	 * @private
	 * @type {?number}
	 */
	this.jobId = null;
	/**
	 * @private
	 * @type {?Date}
	 */
	this.date = null;
	/**
	 * @private
	 * @type {?string}
	 */
	this.description = null;
	/**
	 * @private
	 * @type {?string}
	 */
	this.userOrRoleToNotify = null;
	/**
	 * @private
	 * @type {?number}
	 */
	this.userOrRoleIdToNotify = null;
	/**
	 * @private
	 * @type {?Object}
	 */
	this.scheduledJob = null;

	this.setDiscordGuildId = function(guildId) {
		this.discordGuildId = guildId;
	}.bind(this);

	this.getDiscordGuildId = function() {
		return this.discordGuildId;
	}.bind(this);

	this.setJobId = function(jobId) {
		this.jobId = jobId;
	}.bind(this);

	this.getJobId = function() {
		return this.jobId;
	}.bind(this);

	this.setDate = function(date) {
		this.date = date;
	}.bind(this);

	this.getDate = function() {
		return this.date;
	}.bind(this);

	this.setDescription = function(description) {
		this.description = description;
	}.bind(this);

	this.getDescription = function() {
		return this.description;
	}.bind(this);

	this.setUserOrRoleToNotify = function(userOrRoleToNotify) {
		this.userOrRoleToNotify = userOrRoleToNotify;
	}.bind(this);

	this.getUserOrRoleToNotify = function() {
		return this.userOrRoleToNotify;
	}.bind(this);

	this.setUserOrRoleIdToNotify = function(userOrRoleIdToNotify) {
		this.userOrRoleIdToNotify = userOrRoleIdToNotify;
	}.bind(this);

	this.getUserOrRoleIdToNotify = function() {
		return this.userOrRoleIdToNotify;
	}.bind(this);

	this.setScheduledJob = function(scheduledJob) {
		this.scheduledJob = scheduledJob;
	}.bind(this);

	this.getScheduledJob = function() {
		return this.scheduledJob;
	}.bind(this);
}

module.exports = TimerMetaData;
