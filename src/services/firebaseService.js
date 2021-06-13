import config from '../utils/config'
import firebase from "firebase";

firebase.initializeApp(config);

export const db = firebase.firestore()
export const auth = firebase.auth()

export default class FirebaseService {
  static async getDocument(collection, document) {
    return await db.collection(collection).doc(document).get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.error("No such document!");
      }
    }).catch((error) => {
        console.error("Error getting document:", error);
    });
  }

  static async getAllDocuments(collection, key) {
    return db.collection(collection).orderBy("createdAt", "desc").get()
    .then((data) => {
      let results = [];
      data.forEach((doc) => {
        results.push({
          id: doc.id,
          [key]: doc.data()
        });
      });
      return results
    })
    .catch((error) => {
      console.error("Error getting all documents: ", error);
    });
  }

  static async createAccountWithEmailAndPassword(email, password) {
    return await auth.createUserWithEmailAndPassword(email, password).then((data) => {
      return data.user
    })
  }

  static async signInWithEmailAndPassword(email, password) {
    return await auth.signInWithEmailAndPassword(email, password).then((data) => {
      return data.user
    })
  }
}
