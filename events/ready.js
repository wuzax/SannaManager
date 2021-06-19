module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run () {
        this.client.user.setActivity("+help | v1.0.1");

        if(!process.argv.includes("--uncache")) await this.client.wait(1000);
        let invites = {};
        let startAt = Date.now();
        this.client.fetching = true;

        this.client.invitations = invites;
        this.client.fetched = true;
        this.client.fetching = false;
        if(this.client.shard.ids.includes(0)) console.log("=================================================");
        console.log(`\x1b[32m%s\x1b[0m`, `SHARD [${this.client.shard.ids[0]}]`, "\x1b[0m", `Invites fetched in ${Date.now() - startAt} ms.`);
        console.log("=================================================");
        if(this.client.shard.ids.includes(this.client.shard.count-1)){
            console.log("Ready. Logged as "+this.client.user.tag+". Some stats:\n");
            this.client.shard.broadcastEval(() => {
                console.log(`\x1b[32m%s\x1b[0m`, `SHARD [${this.shard.ids[0]}]`, "\x1b[0m", `Serving ${this.users.cache.size} users in ${this.guilds.cache.size} servers.`);
            });
        }
    }
};

