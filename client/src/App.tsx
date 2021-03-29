import React, { useState } from 'react';
import axios, { CancelTokenSource } from 'axios';
import './App.css';

interface IPost {
  body: string;
}

const defaultPosts: IPost[] = [];

const App: React.FC = () => {
  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = useState(
    defaultPosts
  );

  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] = useState(
    ''
  );
  const cancelToken = axios.CancelToken;
  const [cancelTokenSource]: [
    CancelTokenSource,
    (cancelTokenSource: CancelTokenSource) => void
  ] = useState(cancelToken.source());

  const handleCancelClick = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('User cancelled operation');
    }
  };

  axios.get('https://ln7kvmlhug.execute-api.us-east-1.amazonaws.com/prod/')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  })

  return (
    <div className="App">
      {loading && <button onClick={handleCancelClick}>Cancel</button>}
      <ul className="posts">
        {posts.map((post) => (
          <li>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
