import firebaseConfig from "./config"
import { initializeApp } from "firebase/app"
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth"
import {
  getFirestore,
  onSnapshot,
  collection,
  query,
  where,
  limit,
  getDocs,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore"
//import { navigate } from "gatsby"
import { navigate } from "@reach/router"
import { getFunctions, httpsCallable } from "firebase/functions"
import { getStorage } from "firebase/storage"

const app = initializeApp(firebaseConfig)
console.log("App", app)
console.log("config", firebaseConfig)
const googleProvider = new GoogleAuthProvider();

class Firebase {
  constructor() {
    if (!firebaseInstance) {
      this.auth = getAuth(app)
      this.db = getFirestore(app)
      this.functions = getFunctions(app)
      this.storage = getStorage(app)
    }
  }

  async getUserProfile({ userId, handler }) {
    const usersRef = collection(this.db, "users");
    const q = query(usersRef, where("uid", "==", userId));
    const docs = await getDocs(q);
    let profile = null
    docs.forEach((doc) => {
      profile = doc.data()
    });
    return profile
  }
  async register(info){
    createUserWithEmailAndPassword(this.auth, info.email, info.password)
      .then(async (user) => {

          if (typeof window !== "undefined") {
            window.sessionStorage.setItem('Auth Token', user._tokenResponse.refreshToken)
          }
          await addDoc(collection(this.db, "users"), {
          uid: user.user.uid,
          name: info.username,
          authProvider: "local",
          email: info.email,
          number: info.number,
          role: info.role
        });
          console.log('User', user, 'registered!');
          return user
      })
      .catch((error) => {
        alert(error.message)
        navigate("/register")
      });
    };

  // async register({ email, password, username }) {
  //   await createUserWithEmailAndPassword(this.auth, email, password)
  //   const createProfileCallable = httpsCallable(
  //     this.functions,
  //     "createPublicProfile"
  //   )
  //   return createProfileCallable({
  //     username,
  //   })
  // }

  async login({ email, password }) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  async logout() {
    if (typeof window !== "undefined") {
      window.sessionStorage.clear()
    }
    await signOut(this.auth)
  }

  async signInWithGoogle() {
  try {
    const res = await signInWithPopup(this.auth, googleProvider);
    const user = res.user;
    const q = query(collection(this.db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(this.db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
      console.log("Success")
    }
  } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async sendPasswordReset(email) {
  try {
    await sendPasswordResetEmail(this.auth, email);
    alert("Password reset link sent!");
  } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // getFirebaseInstance() {
  //   if (!firebaseInstance) {
  //     firebaseInstance = new Firebase()
  //     return firebaseInstance
  //   } else if (firebaseInstance) {
  //     return firebaseInstance
  //   } else {
  //     return null
  //   }
  // }
}

//export default Firebase

let firebaseInstance

function getFirebaseInstance() {
  if (!firebaseInstance) {
    firebaseInstance = new Firebase()
    return firebaseInstance
  } else if (firebaseInstance) {
    return firebaseInstance
  } else {
    return null
  }
}

export default getFirebaseInstance
