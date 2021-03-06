import React from "react";
import { connect } from "react-redux";
import Modal, { closeStyle } from "simple-react-modal";
import { addComment } from "../redux/reducer";
import uuidv1 from "uuid";
import "../assets/scss/modal.scss";

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (comment) => dispatch(addComment(comment)),
  };
};

class ModalBox extends React.Component {
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };
  handleSubmit(event) {
    event.preventDefault(); // prevents page from reloading on submit
    let body = this._body.value;
    let initialComment = new Date().getTime();
    const id = uuidv1();
    this.props.addComment({ body, id, initialComment });
    this.onClose();
  }
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <>
        <Modal
          closeOnOuterClick={true}
          show={this.props.show}
          transitionSpeed={1000}
        >
          <div className="modalStyle">
            <form
              className="form-modal"
              onSubmit={this.handleSubmit.bind(this)}
            ><span style={closeStyle} onClick={this.onClose.bind(this)}>
                X
              </span>
              <div>ADD COMMENT</div>
              <hr></hr>
              <div className="">
                <input
                  className="input-comment"
                  placeholder="Comment"
                  rows="4"
                  required
                  ref={(textarea) => (this._body = textarea)}
                ></input>

                <button className="comment-button" type="submit">
                  Post
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(ModalBox);
