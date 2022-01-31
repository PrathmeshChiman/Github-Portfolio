import './App.css';
import { useEffect, useState } from "react";

function Projects(props){
  const [projects,setProjects] = useState([]);
  console.log(projects);

  useEffect(() => {
    console.log("In Project UseEffect");
    fetch(props.userData.repos_url).then((data) => {return data.json()}).then((respdata) => {
      console.log("data",respdata);
      setProjects(respdata);
    })
  },[props.userData.repos_url]);

  return(
    <div className="infoDiv">
      <h1 style={{textAlign: "center"}} >Projects</h1>
      <div className='alignDiv'>
        <div>
          {projects && projects.map((proj) => {
            return(
              <p>{proj.name}</p>
            )
          })}
        </div>
        <div>
          {projects && projects.map((proj) => {
            return(
              <a href={proj.clone_url} target="_blank" rel="noreferrer">Github.URL</a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Profile(props){
  return(
    <div className="infoDiv">
      <h1 style={{textAlign: "center"}} >Profile</h1>
      <div className='alignDiv'>
        <div>
          <p>html_url</p>
          <p>repos_url</p>
          <p>name</p>
          <p>company</p>
          <p>location</p>
          <p>email</p>
          <p>bio</p>
        </div>
        <div>
          <a href={props.userData.html_url} target="_blank" rel="noreferrer">Github.URL</a>
          <a href={props.userData.repos_url} target="_blank" rel="noreferrer">{props.userData.repos_url}</a>
          <p className="alignLinks">{props.userData.name}</p>
          <p className="alignLinks">{props.userData.company}</p>
          <p className="alignLinks">{props.userData.location}</p>
          <p className="alignLinks">{props.userData.email}</p>
          <p className="alignLinks">{props.userData.bio}</p>
        </div>
      </div>
    </div>
  )
}

function App(props) {

  const githubAPIUrl = 'https://api.github.com/users/';
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [avtar, setAvtar] = useState("https://github.com/github.png?size=460");
  const [flag, setFlag] = useState(false);


  useEffect(()=>{
    // console.log("in App useEffect");
    if(userName !== ''){
    console.log(userName);
    setLoading(true);
    setFlag(true);
    fetch(githubAPIUrl+userName).then(
      data => {
        if(data.status === 404){
          setError(true)
        }else if(data.status === 200){
          setError(false)
        }
        return data.json() 
      }).then(
        setUserData).then(
         setTimeout(()=> {
          setLoading(false)
        },2000) 
        );
    }
  },[userName])

  useEffect(() => {
    if(userData !== {}){
      // console.log("userdata useEffect",userData);
      setAvtar(userData.avatar_url);
    }
  },[userData])

  return (
    <div className="app" style={{border: "2px solid black",paddingBottom: "10px"}}>
      <div style={{backgroundColor: "black",paddingBottom: "10px",marginBottom: "20px"}}>
        <img className="github-avtar" style={{marginTop: "0px"}}src="https://github.com/github.png?size=460" alt="Profile Pic" />
        <h1 style={{textAlign: "center",color: "white"}} >My Github Portfolio</h1>
      </div>
      {error && <p>Person Not Found</p>}
      <input className="input-username" placeholder='Enter Github Username' autoFocus={true} onKeyDown={(e) => {
        if(e.key === "Enter"){
          setUserName(e.target.value);
        }
      }} />
      {loading && <img src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="Loading" />}
      {/* {!loading && <img className="github-avtar" src={userData.avatar_url} alt="Profile Pic" /> } */}
      { flag && <img className="github-avtar" src={avtar} alt="Profile Pic" />}
      { flag && <Profile userData={userData}/>}
      {/* Profile Information */}
      {/* <div className="infoDiv">
        { !loading && <h1 style={{textAlign: "center"}} >Profile</h1>}
        <div className='alignDiv'>
          <div>
            <p>html_url</p>
            <p>repos_url</p>
            <p>name</p>
            <p>company</p>
            <p>location</p>
            <p>email</p>
            <p>bio</p>
          </div>
          <div>
            <a href={userData.html_url}>Github.URL</a>
            <a href={userData.repos_url}>{userData.repos_url}</a>
            <p className="alignLinks">{userData.name}</p>
            <p className="alignLinks">{userData.company}</p>
            <p className="alignLinks">{userData.location}</p>
            <p className="alignLinks">{userData.email}</p>
            <p className="alignLinks">{userData.bio}</p>
          </div>
        </div>
      </div> */}


      { flag && <Projects userData={userData} />}
      {/* Listing of Projects */}
      {/* <div className="infoDiv">
        { !loading && <h1 style={{textAlign: "center"}} >Projects</h1>}
        <div className='alignDiv'>
          <div>
            <p>Public Repos by user: {userData.public_repos}</p>
            <p>Public Gists by user: {userData.public_gists}</p>
          </div>
          <div>
          <a href="#">Github.URL</a>
          <a href="#">Github.URL</a>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default App;