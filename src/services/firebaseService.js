import config from '../utils/config'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// import 'firebase/storage';

firebase.initializeApp(config);

export const db = firebase.firestore()
export const auth = firebase.auth()

export default class FirebaseService {

  static async setDocumentToCollection(collection, document, data) {
    await db.collection(collection).doc(document).set(data).then(() => {
      console.error("Set data success");
    })
  }

  static async addDocumentToCollection(collection, data) {
    await db.collection(collection).add(data)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error)
    })
  }

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

  static async updateDocument(collection, document, data) {
    await db.collection(collection).doc(document).update(data).then(() => {
      console.log("Document successfully updated!");
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
  }

  static async deleteDocument(collection, document) {
    await db.collection(collection).doc(document).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error delete document: ", error);
    });
  }

  static async createAccountWithEmailAndPassword(email, password) {
    return await auth.createUserWithEmailAndPassword(email, password).then((data) => {
      return {
        error: false, 
        user: data.user
      }
    }).catch((error) => {
      console.error("Error create account with Authentication: ", error)
      if(error.code === 'auth/email-already-in-use') {
        return {
          error: true,
          message: "メールアドレスが登録されました"
        }
      } else {
        return {
          error: true,
          message: "登録中にエラーが発生しました、もう一度お試しください"
        }
      }
    });
  }

  static async signInWithEmailAndPassword(email, password) {
    return await auth.signInWithEmailAndPassword(email, password).then((data) => {
      return {
        error: false, 
        user: data.user
      }
    }).catch((error) => {
      console.error("Error when login: ", error)
      if(error.code === 'auth/user-not-found') {
        return {
          error: true,
          message: "アカウントが見つかりません"
        }
      } else if (error.code === 'auth/wrong-password'){
        return {
          error: true,
          message: "パスワードが正しくない"
        }
      }
    });
  }
  
  static async uploadImage(img) {
    const ref = await firebase.storage().ref().child(`/images/${img.name}`);
    let url = "";
    try {
        await ref.put(img);
        url = await ref.getDownloadURL();
    } catch (err) {
        console.log(err);
    }
    return url;
  }
}