const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./index.js", {
    token: require("./config").token,
    autoSpawn: true,
    shardArgs: process.argv
});

console.log("Hello, "+require("os").userInfo().username+". Thanks for using SannaManager.");
manager.spawn();