import { useState, useContext } from "react";
import { UserContext } from "./context/userContext";
import moment from "moment";

function CommentList({ handleDeleteComment, comment, user, _id, editComment }) {
  const [editDeleteToggle, setEditDeleteToggle] = useState(false);

  const [isCommentEdit, setIsCommentEdit] = useState(false);

  const [editField, setEditField] = useState({ comment: comment.comment });

  console.log(editField);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditField((prevEditField) => {
      return {
        ...prevEditField,
        [name]: value,
      };
    });
  };

  console.log(isCommentEdit);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editComment(comment._id, editField, _id);
    setEditDeleteToggle(!editDeleteToggle);
    setIsCommentEdit(!isCommentEdit);
  };

  function deleteComment() {
    handleDeleteComment(comment._id, _id);
  }

  const timestamp = comment.datePosted;

  const timePasesed = moment(timestamp).fromNow();
  console.log(comment);
  return (
    <div id="comment-container">
      <p style={{ fontSize: "90%" }}>
        <b>Comment by: {comment.userId.username}</b>
      </p>
      <p>{comment.comment}</p>
      <p>Commented {timePasesed}</p>
      {comment.userId._id === user._id && (
        <div className="comment-btn-dropdown">
          <button onClick={() => setEditDeleteToggle((prev) => !prev)}>
            ...
          </button>
          {editDeleteToggle && (
            <div className="dropdown-content">
              <button onClick={deleteComment}>Delete</button>
              <button
                onClick={() => {
                  setIsCommentEdit((prev) => !prev);
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      )}
      {isCommentEdit && (
        <form onSubmit={handleEditSubmit}>
          <textarea
            value={editField.comment}
            name="comment"
            type="text"
            onChange={handleChange}
          />

          <button>Submit</button>
          <button
            onClick={() => {
              setIsCommentEdit((prev) => !prev);
            }}
          >
            X
          </button>
        </form>
      )}
    </div>
  );
}

export default CommentList;
