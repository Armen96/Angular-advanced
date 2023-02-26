import * as functions from "firebase-functions";

import {UserModel} from "../models";
const userModel = new UserModel();

exports.onCreate = functions.firestore
  .document("users/{docID}")
  .onCreate(async (snap, context) => {
    const docID = context.params.docID;
    const data = snap.data();

    if (data && docID) {
      const record = await userModel.getUser(docID);

      console.log("USER RECORD", JSON.stringify(record));
    }

    return Promise.resolve(true);
  });
