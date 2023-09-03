import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

const userAxios = axios.create();
// taking the token saved from Local Storage and adding it to the Authorization header for any axios request   // just like Postman
userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function UserProvider(props) {
  const [tedData, setTedData] = useState([]);

  const navigate = useNavigate();

  const [test, setTest] = useState("test context");
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    posts: [],
    errMsg: "",
  };

  const [userState, setUserState] = useState(initState);
  console.log("user posts", userState.posts);

  function signup(credentials) {
    axios
      .post("/api/auth/signup", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        setUserState((prevUserState) => {
          return {
            ...prevUserState,
            user,
            token,
          };
        });
      })
      .catch((err) => console.log(err.response.data.message));
  }

  function login(creds) {
    axios
      .post("/api/auth/login", creds)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState({
      user: {},
      token: "",
      posts: [],
    });
  }

  function handleAuthErr(errMsg) {
    setUserState((prevUserState) => ({
      ...prevUserState,
      errMsg,
    }));
  }

  function resetAuthErr() {
    setUserState((prevUserState) => ({
      ...prevUserState,
      errMsg: "",
    }));
  }

  function getData() {
    userAxios
      .get("/api/main/ted/allWithComments")
      .then((res) => setTedData(res.data))
      .catch((err) => console.log(err));
  }

  function addTedData(data) {
    userAxios
      .post("/api/main/ted", data)
      .then((res) =>
        setTedData((prevTedData) => {
          return [...prevTedData, res.data];
        })
      )
      .catch((err) => console.log(err));
    navigate("/ted");
  }

  function deleteComment(commentId) {
    userAxios
      .delete(`/api/main/comments/${commentId}`)
      .then((res) => {
        setUserState((prevUserState) => {
          const updatedPosts = prevUserState.posts.map((post) => {
            return {
              ...post,
              comments: post.comments.filter(
                (comment) => comment._id !== commentId
              ),
            };
          });

          return {
            ...prevUserState,
            posts: updatedPosts,
          };
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        test,
        logout,
        login,
        getData,
        tedData,
        addTedData,
        deleteComment,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
