class Parser {
  static prefix = "w."
  constructor(message) {
    this.message = message;
  }

  static isValidMessage(message) {
    if (message.author.bot) return false;
    if (!message.content.startsWith(Parser.prefix)) return false;
    return true;
  }

  parse() {
    const Help = require("./Commands/Help")
    const Link = require("./Commands/Link");
    const Me = require("./Commands/Me");
    const List = require("./Commands/List");
    const Anime = require("./Commands/Anime");
    const AnimeCompact = require("./Commands/AnimeCompact");
    const Manga = require("./Commands/Manga");
    const MangaCompact = require("./Commands/MangaCompact");
    const Watching = require("./Commands/Watching");
    const commands = [Link, Me, List, Anime, Manga, Watching];

    this.separateCommandAndArgs();

    switch(this.command.toLowerCase()) {
      case Help.command:
        return new Help(this.message, commands);
        break;
      case Link.command:
        return new Link(this.message, this.args)
        break;
      case Me.command:
        return new Me(this.message)
        break;
      case List.command:
        return new List(this.message, this.args)
        break;
      case Anime.command:
        return new Anime(this.message, this.args);
        break;
      case AnimeCompact.command:
        return new AnimeCompact(this.message, this.args);
        break;
      case Manga.command:
        return new Manga(this.message, this.args);
        break;
      case MangaCompact.command:
        return new MangaCompact(this.message, this.args);
        break;
      case Watching.command:
        return new Watching(this.message);
        break;
      default:
        break;
    }
  }
  
  async isUserMod() {
    const member = await this.message.guild.member(this.message.author);
    if (member) return await member.hasPermission("MANAGE_MESSAGES");
  }

  separateCommandAndArgs() {
    const commandBody = this.removePrefix();
    this.args = commandBody.split(' ');
    if (this.args.length > 1) {
      this.command = this.args.shift().toLowerCase();
    }
    else {
      this.command = this.args[0]
      this.args = [];
    }
  }

  removePrefix() {
    return this.message.content.slice(Parser.prefix.length);
  }
}
module.exports = Parser