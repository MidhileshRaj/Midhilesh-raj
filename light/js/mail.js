const firebaseConfig = {
    apiKey: "AIzaSyDv2NNLC3WfUhr0QkLqTHCS7WWx--ANhBg",
    authDomain: "web-portfolio-e2835.firebaseapp.com",
    databaseURL: "https://web-portfolio-e2835-default-rtdb.firebaseio.com",
    projectId: "web-portfolio-e2835",
    storageBucket: "web-portfolio-e2835.appspot.com",
    messagingSenderId: "330466957562",
    appId: "1:330466957562:web:d48f3fe187735361259143",
    measurementId: "G-16KLF6FJYQ"
  };


/// Initialize the firbese 
firebaseConfig.initializeApp(firebaseConfig);

/// referance for DB

var contactFormDbRef = firebaseConfig.database().ref('ContactForm');

document.getElementById('contactForm').addEventListener('submit', submitForm);


function submitForm(e){
    e.preventDefault();
    var fname = getElementVal('fname');
    var emailId = getElementVal('emailId');
    var messageContent = getElementVal('messageContent');
saveMessages(fname,emailId,messageContent);
}

const saveMessages=(fname,emailId,messageContent)=>{
    var newContactForm =  contactFormDbRef.push();
    newContactForm.set({
        name:fname,
        email:emailId,
        message:messageContent,
    });
}
  
const getElementVal = (id)=>{
    return document.getElementById(id).value;
}