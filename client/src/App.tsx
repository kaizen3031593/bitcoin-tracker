import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface IPost {
  id: number;
  data: string;
}

const defaultPosts: IPost[] = [];
var num = 0;


const App: React.FC = () => {
  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = useState(
    defaultPosts
  );

  const [refresh, setRefresh]: [
    boolean,
    (refresh: boolean) => void
  ] = React.useState<boolean>(false);

  const callAPIClick = () => {
    setRefresh(false);
    axios.get(`https://ln7kvmlhug.execute-api.us-east-1.amazonaws.com/prod/${num}`)
    .then((response) => {
      console.log(response);
      defaultPosts.push({id: num++, data: response.data});
      setPosts(defaultPosts);
      setRefresh(true);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <div className="App">
      {<button onClick={callAPIClick}>Run</button>}
      <ul className="posts">
        {refresh && posts.map((post) => (
          <li key={post.id}>
            <p>{post.data}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
