import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth"; 

const firebaseConfig = {
    apiKey: "AIzaSyCptiTltb52mFU5xdcNP0ZG70nvF1m3KcA",
    authDomain: "todoapp-4e5cc.firebaseapp.com",
    databaseURL: "https://todoapp-4e5cc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todoapp-4e5cc",
    storageBucket: "todoapp-4e5cc.firebasestorage.app",
    messagingSenderId: "24477780809",
    appId: "1:24477780809:web:57b53169e5ca312832e898"
  };

class Fire {
    constructor(callback){
        this.init(callback)
    }

    init(callback){
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user){
                callback(null, user)
            }
            else{
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error)
                    });
                    
            }
        })
    }

    getLists(callback){
        let ref = this.ref;  
        ref = ref.orderBy("name");

    this.unsubscribe = ref.onSnapshot(snapshot => {
        let lists = [];

        snapshot.forEach(doc => {
            lists.push({id: doc.id, ...doc.data() });
        });

        callback(lists);

    }, error => {
        console.error("Error fetching lists:", error);
        callback([]);
    });
    }

    addList(list) {
        let ref = this.ref;

        ref.add(list);
    }

    updateList(list) {
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }

    get userId() {
        console.log(firebase.auth().currentUser.uid)
        return firebase.auth().currentUser.uid;
    }
    get ref() {
        return firebase
        .firestore()
        .collection("users")
        .doc("HC2IFGqUUwhH5pgTdsSigTMsBOT2")
        .collection("lists");
    }

    detach(){
        if (this.unsubscribe) {
            this.unsubscribe();
        } else {
            console.warn("No unsubscribe function found.");
        }
    }
}

export default Fire;