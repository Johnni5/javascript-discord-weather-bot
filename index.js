require('dotenv').config();

const { InteractionCreateHandler } = require('./events/interactionCreate');
const { Collection, Events, Client, GatewayIntentBits } = require('discord.js');
const { ClientReadyHandler } = require('./events/clientReady');

// commands
const pingCommand = require('./commands/ping');
const forecastCommand = require('./commands/forecast');
const astroCommand = require('./commands/astro');

const client = new Client({
  intents: [
    //Gateway.. -> path via bits for handling taks (simply put)
    GatewayIntentBits.Guilds, // guild- discord intern -> a server
  ], // intents - the tasks os said OBJECT
});

client.commands = new Collection();

// list of client commands
client.commands.set(pingCommand.data.name, pingCommand); //goes into GateWay
client.commands.set(forecastCommand.data.name, forecastCommand);
client.commands.set(astroCommand.data.name, astroCommand);

client.once(Events.ClientReady, ClientReadyHandler);

client.on(Events.InteractionCreate, InteractionCreateHandler);

client.login(); // in this case, Discord will take them per default from env
