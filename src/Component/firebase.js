// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArqis4lTHEW7MJFubp-TSiOPI-Ymsvs6Q",
  authDomain: "react-store-mng.firebaseapp.com",
  projectId: "react-store-mng",
  storageBucket: "react-store-mng.appspot.com",
  messagingSenderId: "447927413368",
  appId: "1:447927413368:web:39b824fba60e11612f5b8d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };

// Create a function to get the user auth state
export function useFirebaseAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    // Unsubscribe when the component unmounts.
    return () => unsubscribe();
  }, []);

  return user;
}
