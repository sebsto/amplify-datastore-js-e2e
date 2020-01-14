import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";

import { Post, PostStatus } from "./models";

import awsConfig from "./aws-exports";
Amplify.configure(awsConfig);

function onCreate() {
  DataStore.save(
    new Post({
      title: `New title ${Date.now()}`,
      rating: (function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      })(1, 7),
      status: PostStatus.ACTIVE
    })
  );
}

function onDeleteAll() {
  DataStore.delete(Post, Predicates.ALL);
}

async function onQuery(setPosts) {
  const posts = await DataStore.query(Post, c => c.rating("gt", 4));
  setPosts(posts)
}

async function listPosts(setPosts) {
  const posts = await DataStore.query(Post, Predicates.ALL);
  setPosts(posts);
}
    
function App() {
  
  const [posts, setPosts] = useState([]);

  useEffect( () => {
    
    listPosts(setPosts);

    const subscription = DataStore.observe(Post).subscribe(msg => {
      console.log(msg.model, msg.opType, msg.element);
      listPosts(setPosts);
    });

    const handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      console.log(condition);
      if (condition === 'online') { listPosts(setPosts); }
    }
    
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);
       
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      <div>
        <input type="button" value="NEW" onClick={() => { onCreate(); listPosts(setPosts)} } />
        <input type="button" value="DELETE ALL" onClick={() => { onDeleteAll(); listPosts(setPosts)} } />
        <input type="button" value="QUERY rating > 4" onClick={() => { onQuery(setPosts)} } />
        <input type="button" value="ALL POST" onClick={() => { listPosts(setPosts)} } />
      </div>
      <table border="1">
        <thead>
          <tr><td>Id</td><td>Title</td><td>Rating</td><td>Version</td></tr>
        </thead>
        <tbody>
          {posts.map( (item,i) => {
            return <tr key={i}><td>{posts[i].id.substring(0,8)}...</td><td>{posts[i].title}</td><td>{posts[i].rating}</td><td>{posts[i]._version}</td></tr>
          } )}
        </tbody>
      </table>
      <a href="App.js">Download source code</a>
      </header>
    </div>
  );
}

export default App;
