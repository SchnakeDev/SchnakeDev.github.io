// Let's start with importing `NlpManager` from `node-nlp`. This will be responsible for training, saving, loading and processing.
const { NlpManager } = require("node-nlp");
// Let's import fs module to read our json files.
const fs = require("fs");

// Require the framework and instantiate it
const app = require('fastify')({
    logger: true
})

// Declare a route
app.get('/', function (req, reply) {
    reply.send({ hello: 'world' })
})
app.get('/ask', answer);
app.get('/do-training', train);
app.get('/train', addQuestionToIntent);

// Run the server!
app.listen(3001, '0.0.0.0', (err, address) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    app.log.info(`server listening on ${address}`)
});

async function answer(req, reply) {
    console.log("Starting Chatbot ...");
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET");
    // Creating new Instance of NlpManager class.
    const manager = new NlpManager({ languages: ["en"] });
    // Loading our saved model
    manager.load();
    // Here Passing our input text to the manager to get response and display response answer.
    const response = await manager.process("en", req.query.q);
    console.log(req.query)
    return {
        answer: response.answer
    };
}

async function train(req, reply) {
    // Creating new Instance of NlpManager class.
    const manager = new NlpManager({ languages: ["en"] });
    // Let's read all our intents files in the folder intents
    const files = fs.readdirSync("./intents");
    // Looping through the files and Parsing the string to object and passing it to manager instance to train and process it.
    for (const file of files) {
        let data = fs.readFileSync(`./intents/${file}`);
        data = JSON.parse(data);
        const intent = file.replace(".json", "");
        for (const question of data.questions) {
            manager.addDocument("en", question, intent);
        }
        for (const answer of data.answers) {
            manager.addAnswer("en", intent, answer);
        }
    }
    // let's create a function that will be responsible for Training and saving the manager instance.
    async function train_save() {
        await manager.train();
        manager.save();
    }
    // Calling the above function
    await train_save();
    return {
        training: "Complete"
    };
}

async function addQuestionToIntent(req, reply) {
    const intent = req.query.intent;
    const question = req.query.question;
    const answer = req.query.answer;
    let data = null;
    try {
        const file = fs.readFileSync(`./intents/${intent}.json`);
        data = JSON.parse(file);
        data.questions.push(question);
        data.answers.push(answer);
    }
    catch (e) {
        data = { questions: [], answers: [] };
        data.questions.push(question);
        data.answers.push(answer);
    }
    fs.writeFileSync(`./intents/${intent}.json`, JSON.stringify(data));
    const training = await train(req, reply)
    data.training = training.training;
    return data;
}

async function addQuestionToIntent(req, reply) {
    const intent = req.query.intent;
    const question = req.query.question;
    const answer = req.query.answer;
    let data = null;
    try {
        const file = fs.readFileSync(`./intents/${intent}.json`);
        data = JSON.parse(file);
        data.questions.push(question);
        data.answers.push(answer);
    }
    catch (e) {
        data = { questions: [], answers: [] };
        data.questions.push(question);
        data.answers.push(answer);
    }
    fs.writeFileSync(`./intents/${intent}.json`, JSON.stringify(data));
    const training = await train(req, reply)
    data.training = training.training;
    return data;
}