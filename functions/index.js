const functions = require("firebase-functions");

const axios = require("axios");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/**
 * HTTP FUNCTIONS
 */

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello From Firebase Function");
});

exports.api = functions.https.onRequest(async (req, res) => {
  switch (req.method) {
    case "GET":
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      res.send(response.data);
      break;
    case "POST":
      const body = req.body;
      res.send(body);
      break;
    case "PATCH":
      res.send("This is PATCH");
      break;
    case "DELETE":
      res.send("This is DELETE");
      break;
    default:
      res.send("This is default");
      break;
  }
});

/**
 * AUTHENCATION FUNCTIONS
 */

exports.userAdded = functions.auth.user().onCreate((user) => {
  console.log(user);
  return Promise.resolve();
});

exports.userDeleted = functions.auth.user().onDelete((user) => {
  console.log("User Deleted");
  return Promise.resolve();
});

/**
 * FIREBASE STORE
 */

exports.fruitAdded = functions.firestore
  .document("/fruits/{documentId}")
  .onCreate((snapshot, context) => {
    console.log(snapshot.data());
    return Promise.resolve();
  });

exports.fruitDeleted = functions.firestore
  .document("/fruits/{documentId}")
  .onDelete((snapshot, context) => {
    console.log(snapshot.data(), "deleted");
    return Promise.resolve();
  });

exports.fruitUpdated = functions.firestore
  .document("/fruits/{documentId}")
  .onUpdate((snapshot, context) => {
    console.log(snapshot.before.data());
    console.log(snapshot.after.data());
    return Promise.resolve();
  });

/**
 * SCHEDULE FUNCTIONS
 */

exports.scheduleFunctions = functions.pubsub
  .schedule("* * * * *")
  .onRun((context) => {
    console.log("Schedule Functions running every 1 sec");
    console.log(context);

    return null;
  });

// firebase deploy --only (command for deploying only function)
// firebase deploy --only functions:scheduleFunctions (deploy only particular function)

//need money to deploy to real firebase
