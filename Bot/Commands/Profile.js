const BaseCommand = require("./Base.js");
const User = require("../User");

class ProfileCommand extends BaseCommand {
  static command = "profile";
  static helpTitle = "Shows the user's or a mentioned user's linked AniList account.";
  static helpDescription = `${BaseCommand.prefix + this.command} [<@User or ID>]`

  constructor(message, args) {
    super(message, args);
  }

  async execute() {
    const user = await this.makeAnilistUserFromMessageOrMention();
    if (!user) return;
    const embed = user.makeAniListProfileEmbed();  
    return this.reply(embed);
  }
}
module.exports = ProfileCommand;