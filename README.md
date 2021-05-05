# Multi Timer Discord Bot

A simple Discord bot to provide reminders after a specified period of time.

## Installation

1. Get a bot token from Discord.
1. Run `npm install`
2. Copy `.env.example` to `.env` and configure the Discord bot token and command prefix.
3. Run `node app.js`

## Commands

(Assuming `COMMAND_PREFIX` is `!`)

- `!help` - Provides a brief list of commands on how to use the bot.
- `!timer <time> <description>` - Start a timer for `<time>` with a reminder text of `description`.
- `!tz <timezone>` - Allows a user to enter their timezone for locale-specific date and time. Use the "TZ database name" from https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List. Timezone is case-sensitive.
- `!status` - Displays the list of upcoming timer notifications.

## Time Format

Time format is currently specified in `1d23h59m59s` format. All fields are optional. Examples of valid formats:
- `1d15h43m` - 1 day, 15 hours, 45 minutes
- `23h35m` - 23 hours, 35 minutes
- `15m` - 15 minutes
- `1m50s` - 1 minute, 50 seconds 

This project may change to use `1:23:59:59` format in the future.

## To Do

- Ability to restrict which channels the bot listens and responds to, per guild (server)
- Investigate use of rich text widgets for displaying upcoming timers
- Make command prefix customizable per guild
- Add feature to cancel existing timers
- Add unit tests
- Add persistence, save user timezone preferences and scheduled jobs
- Support localization

## License

MIT License. See `LICENSE.txt`

Copyright &copy; 2021 John Nahlen
