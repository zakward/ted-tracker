import React, { useState, useContext } from "react";
import CommentList from "./CommentList";
import moment from "moment";
import { UserContext } from "./context/userContext";

export default function TedDetails(props) {
  console.log(props);
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

  const commentList = props.comments.map((comment) => {
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

  console.log(props.comments);
  let viewOrHide;

  if (commentToggle === false) {
    viewOrHide = `View`;
  } else {
    viewOrHide = `Hide`;
  }

  const timestamp = props.datePurchased;
  const timePassed = moment(timestamp).fromNow();
  return (
    <>
      <div key={props._id} id={"ted-details-container"}>
        <h1>{props.name}</h1>
        <p>Strength: {props.strength}</p>
        <p>Effects: {props.effects}</p>
        <p>Flavor: {props.flavor}</p>
        <p>Lineage: {props.lineage}</p>
        <p>Price: {props.price}</p>
        {/* <p>{props.ted.comments}</p> */}
        <p>Category: {props.category}</p>
        <p>Date Purchased: {timePassed}</p>
        <img src={props.imgUrl} alt="flower" className="ted-img" />
        {props.comments.length > 0 && (
          <button
            className="view-cmt-btn"
            onClick={() => setCommentToggle((prev) => !prev)}
          >
            {props.comments.length === 1
              ? `${viewOrHide} comment`
              : `${viewOrHide} all ${props.comments.length} comments`}
          </button>
        )}
        {props.comments.length === 0 && (
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
