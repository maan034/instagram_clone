import React ,{ useState,useEffect } from 'react'
import './App.css';
import { auth, db } from './firebase';
import Post from  './Post';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button,Input} from '@material-ui/core';
import  ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
const classes = useStyles(); 
const [posts,setPosts]=useState([]);
const [open,setOpen]=useState(false);
const [modalStyle]=useState(getModalStyle);
const [username,setUsername]=useState('');
const [password,setPassword]=useState('');
const [email,setEmail]=useState('');
const [user,setUser] =useState(null);
const [openSignIn,setOpenSignIn] = useState(false);
const [openSignUp,setOpenSignUp] = useState(false);

useEffect(()=>{
  const unsubscribe = auth.onAuthStateChanged((authUser)=>{
    if(authUser)
    {console.log(authUser);
      setUser(authUser);
      //user has logged in ...
    }
    else
    {
      //user has logged out... 
      setUser(null);
    }
  })
  return ()=>{
    //perform some cleanup actions
    unsubscribe();
  }
},[user,username]);


useEffect(()=>{
db.collection('posts').onSnapshot(snapshot =>{
  setPosts(snapshot.docs.map(doc=> ({
    id:doc.id,
    post:doc.data()
  })));
})
},[]);

const  signUp = (event)=>{
  event.preventDefault();
  
  auth.createUserWithEmailAndPassword(email,password)
  
  .then((authUser) =>
  {
      authUser.user.updateProfile({
      displayName: username
    })
  })
  .catch((error) =>alert(error.message));
  setOpen (false);
  }
  
  const  signIn = (event)=>{
    event.preventDefault(); 
    
    auth.signInWithEmailAndPassword(email,password)
  
    .catch((error) =>alert(error.message));
    setOpenSignIn(false);  
  }

  return (
    <div className="app">   

     <div className="app_header">  
      <img className="app_headerImage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
        alt=""
        />
        {
        user?(
         <div className="app__loginContainer">
         <Button  onClick={() =>auth.signOut()}>Logout</Button>
         </div> ):
          (
         <div className="app__loginContainer">
            <Button onClick={() =>setOpenSignIn(true)}>Sign In</Button>
            <Button  onClick={() =>setOpen(true)}>Sign Up</Button>
         </div>
          )
        }

      </div>
      <div classNAme="app_post">
      {
        posts.map( ( {id,post}) =>
          (
            <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
      }
      </div>
    
        {/*<h1>nfbfwifbwfhifhqfhifqifquifqififqif</h1>
        <InstagramEmbed
        url='https://instagr.am/p/Zw9o4/'
        maxWidth={500}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
        />
      </div>
        */}
      <Modal
          open={openSignIn}
          onClose={()=> setOpenSignIn(false)}

        >
        <div style={modalStyle} className={classes.paper}>
          <form className ="app_signup">
          <center> 
          <img className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
          alt=""
          />
            </center>
          <Input
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

          <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={signIn}>Sign In</Button>
          </form>    
        </div>
      </Modal>


      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        >
        <div style={modalStyle} className={classes.paper}>
          
          <center>
          <img className="app_headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
            alt=""
            />
            </center>
            <form className="app_signup">
            <Input
             placeholder="username"
             type="text"
             value={username}
             onChange={(e)=>setUsername(e.target.value)}
            />
            <Input
             placeholder="email"
             type="text"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
            />
            <Input
             placeholder="password"
             type="password"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
            />
            <Button onClick={signUp}>signup</Button>
            </form>
        </div>
      </Modal>

        {
        user?.displayName?(
        <ImageUpload username={user.displayName} />
        ):
        (
          <marquee text-color="red" scrolldirection="left" >Sorry you need to sig in  to upload </marquee>
        )}
    </div>
  );
}

export default App;
