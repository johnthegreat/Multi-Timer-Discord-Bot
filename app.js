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

// Module dependencies
require('dotenv').config({});
const moment = require('moment-timezone');
const Discord = require('discord.js');
const client = new Discord.Client();
const schedule = require('node-schedule');

const TimerMetaData = require('./TimerMetaData');
const getNextAvailableJobId = require('./getNextAvailableJobId');
const timerMetaDataRepository = require('./TimerMetaDataRepository');
const userTimeZoneRepository = require('./UserTimeZoneRepository');

// Load utilities
const chompNextWord = require('./utils/chompNextWord');
const parseDateString = require('./utils/parseDateString');
const isValidTimezone = require('./utils/isValidTimezone');

const DATE_FORMAT = process.env.DATE_FORMAT || 'MM/DD/YY hh:mm A Z';

// TODO: allow users to be able to change this at runtime (change from `const` to `let`)
const commandPrefix = process.env.COMMAND_PREFIX;

client.on('ready', function() {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', function(message) {
	// This event will run on every single message received, from any channel or DM.

	// It's good practice to ignore other bots. This also makes your bot ignore itself
	// and not get into a spam loop (we call that 'botception').
	if (message.author.bot) {
		return;
	}

	// Also good practice to ignore any message that does not start with our prefix
	if (!message.content.startsWith(commandPrefix)) {
		return;
	}

	const [command, args] = chompNextWord(message.content);

	const guildOrChannelId = (function() {
		// A DM is not in a guild channel, use this as the ID
		// https://discord.js.org/#/docs/main/stable/class/Channel
		if (message.channel.type === "dm") {
			return message.channel.id;
		} else if (message.channel.type === "text" && message.guild !== null) {
			return message.guild.id;
		}
	})();

	if (command === commandPrefix+'timer') {
		const [timerValue, timerDescription] = chompNextWord(args);

		const timerDate = parseDateString(timerValue);
		if (timerDate !== null) {
			const jobId = getNextAvailableJobId();
			const scheduledJob = schedule.scheduleJob(timerDate, function () {
				const channelToSend = client.channels.cache.get(message.channel.id);
				if (channelToSend) {
					channelToSend.send('Reminder <@' + message.author.id + '>: ' + (timerDescription ? timerDescription : '(no description provided)'));
				}

				// Since the job has now executed, we no longer need to keep track of it.
				timerMetaDataRepository.deleteTimerMetadata(guildOrChannelId, jobId);
			});
			scheduledJob._id = jobId;

			const timerMetaData = new TimerMetaData();
			timerMetaData.setJobId(jobId);
			timerMetaData.setDate(timerDate);
			timerMetaData.setDescription(timerDescription);
			timerMetaData.setUserOrRoleToNotify(message.author.username);
			timerMetaData.setUserOrRoleIdToNotify(message.author.id);
			timerMetaData.setScheduledJob(scheduledJob);

			timerMetaDataRepository.addTimerMetadata(guildOrChannelId, timerMetaData);
			const timeZone = userTimeZoneRepository.getUserTimeZone(message.author.id) || 'UTC';
			message.channel.send('Timer scheduled for ' + moment(scheduledJob.nextInvocation().toISOString()).tz(timeZone).format(DATE_FORMAT) + '.');
		} else {
			message.channel.send('Unable to parse the date string.');
		}
	} else if (command === commandPrefix+'status') {
		const timeZone = userTimeZoneRepository.getUserTimeZone(message.author.id) || 'UTC';
		message.channel.send(buildScheduledJobsTable(timerMetaDataRepository.getAllTimerMetadata(guildOrChannelId),timeZone));
	} else if (command === commandPrefix+'tz') {
		// args is timezone
		if (isValidTimezone(args)) {
			userTimeZoneRepository.setUserTimeZone(message.author.id, args);
			message.channel.send('User timezone set.');
		} else {
			message.channel.send('Timezone does not appear to be valid.');
		}
	} else if (command === commandPrefix+'help') {
		message.channel.send('Commands:\n'+
		commandPrefix+'help - Show this help message.\n' +
		commandPrefix+'timer <time> <description> - Starts a timer with an optional description. You will be @ mentioned when the timer is up. Time format: 1d23h59m59s\n' +
		commandPrefix+'status - Show upcoming scheduled reminders.\n' +
		commandPrefix+'tz <timezone> - Set your timezone. Use the "TZ database name" from https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List. Timezone is case-sensitive.');
	}
});

/**
 *
 * @param {TimerMetaData[]} timerObjects
 * @param {string} timeZone
 * @return {string}
 */
function buildScheduledJobsTable(timerObjects,timeZone) {
	if (timerObjects.length === 0) {
		return "There are no active timers scheduled.";
	}

	timerObjects = timerObjects.sort(function(a,b) {
		return a.getDate() - b.getDate();
	});

	let str = 'Active timers:\n```\n';
	for(let i=0;i<timerObjects.length;i++) {
		const timerObject = timerObjects[i];
		const scheduledJob = timerObject.scheduledJob;
		str += moment(scheduledJob.nextInvocation().toISOString()).tz(timeZone).format(DATE_FORMAT) + '\t @' + timerObject.getUserOrRoleToNotify() + '\t' + (timerObject.getDescription() ? timerObject.getDescription() : '(no description provided)') + '\n';
	}
	str = str.trim();
	str += '```';
	return str;
}

(async function() {
	try {
		await client.login(process.env.DISCORD_TOKEN);
	} catch (err) {
		console.log('Unable to login to Discord.');
		console.error(err);
		process.exit(1);
	}
})();
