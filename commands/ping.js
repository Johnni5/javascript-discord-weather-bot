const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

async function execute(interaction) {
  await interaction.reply('Pong!');

  // throw new Error('Made up Error - TEST');
}

module.exports = { data, execute };
