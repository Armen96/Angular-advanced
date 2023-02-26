import * as admin from "firebase-admin";

admin.initializeApp();
admin.firestore().settings({ignoreUndefinedProperties: true});

/* V1 */
exports.users = require("./v1/users/users");
