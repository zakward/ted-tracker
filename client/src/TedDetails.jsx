import React, { useState, useContext } from "react";
import CommentList from "./CommentList";
import moment from "moment";
import { UserContext } from "./context/userContext";

export default function TedDetails(props) {
  const { deleteComment, user, _id } = useContext(UserContext);
  const [commentToggle, setCommentToggle] = useState(false);
  const [inputToggle, setInputToggle] = useState(false);
  const [input, setInput] = useState({ comment: "" });
  const [textAreaToggle, setTextAreaToggle] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const commentList = props.ted.comments.map((comment) => {
    return (
      <CommentList
        // handleDeleteComment={handleDeleteComment}
        comment={comment}
        user={user}
        _id={_id}
        key={comment._id}
        // editComment={editComment}
      />
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(_id, input);
    setTextAreaToggle((prev) => !prev);
  };

  console.log(props.ted.comments);
  let viewOrHide;

  if (commentToggle === false) {
    viewOrHide = `View`;
  } else {
    viewOrHide = `Hide`;
  }

  const timestamp = props.ted.datePurchased;
  const timePassed = moment(timestamp).fromNow();
  return (
    <>
      <div key={props._id} id={"ted-details-container"}>
        <h1>{props.ted.name}</h1>
        <p>Strength: {props.ted.strength}</p>
        <p>Effects: {props.ted.effects}</p>
        <p>Flavor: {props.ted.flavor}</p>
        <p>Lineage: {props.ted.lineage}</p>
        <p>Price: {props.ted.price}</p>
        {/* <p>{props.ted.comments}</p> */}
        <p>Category: {props.ted.category}</p>
        <p>Date Purchased: {timePassed}</p>
        <img src={props.ted.imgUrl} alt="flower" className="ted-img" />
        {props.ted.comments.length > 0 && (
          <button
            className="view-cmt-btn"
            onClick={() => setCommentToggle((prev) => !prev)}
          >
            {props.ted.comments.length === 1
              ? `${viewOrHide} comment`
              : `${viewOrHide} all ${props.ted.comments.length} comments`}
          </button>
        )}
        {props.ted.comments.length === 0 && (
          <button
            className="view-cmt-btn"
            onClick={() => {
              setCommentToggle((prev) => !prev);
              setTextAreaToggle((prevToggle) => !prevToggle);
            }}
          >
            Add a comment . . .
          </button>
        )}
      </div>
      <div id="comment-div-container">
        <div className={`comment-drawer ${commentToggle && "open"}`}>
          <form onSubmit={handleSubmit}>
            {!textAreaToggle && (
              <>
                <textarea type="text" name="comment" value={input.comment} />
                <button>Save Comment</button>
                <button onClick={() => setTextAreaToggle((prev) => !prev)}>
                  Close
                </button>
              </>
            )}
          </form>
          {commentList}
          {textAreaToggle && (
            <>
              <button
                id="view-add-comment-btn"
                onClick={() => setTextAreaToggle((prev) => !prev)}
              >
                Add a comment . . .
              </button>
            </>
          )}
        </div>
      </div>
    </>

    // <p key={ted._id}>{ted.name}</p>
  );
}
