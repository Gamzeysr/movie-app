import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/ToastNotify";

//* Your web app's Firebase configuration
// TODO: Replace the following with your app's Firebase project configuration
//* https://firebase.google.com/docs/auth/web/start
//* https://console.firebase.google.com/ => project settings
//! firebase console settings bölümünden firebaseconfig ayarlarını al
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCKBnNU_Y_pi3hl-hgdURKnoV90jHp3aaM",
  authDomain: "movie-app-b3ac4.firebaseapp.com",
  projectId: "movie-app-b3ac4",
  storageBucket: "movie-app-b3ac4.appspot.com",
  messagingSenderId: "230325040889",
  appId: "1:230325040889:web:20a90245b4f11fa8ec9428"


}


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser = async (email, password, navigate, displayName) => {
  //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //? kullanıcı profilini güncellemek için kullanılan firebase metodu.
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/");
    toastSuccessNotify("Registered successfully!");
    // console.log(userCredential);
  } catch (error) {
    toastErrorNotify(error.message);
    // alert(error.message);
  }
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Email/password
//! Email/password ile girişi enable yap
export const signIn = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    toastSuccessNotify("Logged in successfully!");
  } catch (error) {
    toastErrorNotify(error.message);
    // alert(error.message);
  }
};

export const userObserver = (setCurrentUser) => {
  //! 👆oluşturmuş oldugum state i burada yakaladım artık user ım true ise setCurrentUser ı set et demeliyim.Ama bana sadece bana lazım olan verileri kullanırsam daha makul olacagından bana neler lazımsa onları yazıyorum.o yüzden ✨const { email, displayName, photoURL } = user;setCurrentUser({ email, displayName, photoURL });✨ şeklinde oluşturduk.

  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu.
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName, photoURL } = user; //!👈 dest.
      setCurrentUser({ email, displayName, photoURL });
      console.log(user);
    } else {
      setCurrentUser(false);
      console.log("user signed out");
    }
  });
};

export const logOut = () => {
  signOut(auth);
  toastSuccessNotify("Logged out successfully!");
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Google
//! Google ile girişi enable yap
//* => Authentication => settings => Authorized domains => add domain
//! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle


export const signUpWithGoogle = (navigate) => {
  //! navigate i prop olarak gönderdik 
  const provider = new GoogleAuthProvider();
  //? 👇 Açılır pencere ile giriş yapılması için kullanılan firebase metodu.
  signInWithPopup(auth, provider)
    .then((result) => {
      // console.log(result);
      //!👇Basarılı olursa sayfa bizi home a yönlendirecek.
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
};

export const forgotPassword = (email) => {
  //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      toastWarnNotify("Please check your mail box!");
      // alert("Please check your mail box!");
    })
    .catch((err) => {
      toastErrorNotify(err.message);
      // alert(err.message);
      // ..
    });
};
