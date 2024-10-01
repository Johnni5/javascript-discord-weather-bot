const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { fetchForecast } = require('../requests/forecast');

const data = new SlashCommandBuilder()
  .setName('forecast')
  .setDescription('Replies with the weather Forecast!')
  .addStringOption(option => {
    return option
      .setName('location')
      .setDescription('The location can be a city, zip/postal code or lat/long')
      .setRequired(true);
  })
  .addStringOption(option => {
    return option
      .setName('units')
      .setDescription(
        'The unit system: "metrics (celsius)" or "imperial (fahrenheit)"'
      )
      .setRequired(false)
      .addChoices(
        { name: 'metric', value: 'metric' },
        { name: 'imperial', value: 'imperial' }
      );
  });

async function execute(interaction) {
  await interaction.deferReply();
  // needd due to 3s rule of await reply()
  // gives ephemeral-txt to the user

  const location = interaction.options.getString('location');
  const units = interaction.options.getString('units') || 'metric';
  const isMetric = units === 'metric';

  try {
    const { weatherData, locationName } = await fetchForecast(location);

    const embed = new EmbedBuilder()
      .setColor(0x3f704d)
      .setTitle(`Weather forecast for ${location} ...`) // 0x0099ff
      .setDescription(`Using the ${units} system`)
      .setTimestamp()
      .setFooter({
        text: 'Powered by the weatherapi.com API! :)',
      });

    for (const day of weatherData) {
      const temperatureMax = isMetric
        ? day.temperatureMaxC
        : day.temperatureMaxF;
      const temperatureMin = isMetric
        ? day.temperatureMinC
        : day.temperatureMinF;

      embed.addFields({
        name: day.date,
        value: `⬇️ Low: ${temperatureMin}° - ⬆️ High: ${temperatureMax}°`,
      });
    }

    await interaction.editReply({
      embeds: [embed],
    });
  } catch (error) {
    await interaction.editReply(error);
  }
}

module.exports = { data, execute };
