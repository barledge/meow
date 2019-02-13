import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import "../scss/PostMaker.scss";
import { post } from "../../actions";

class PostMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: "",
      story_url: "",
      post_twitter: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let date = {
      pub_date: "2018-07-24",
      pub_time: "13:43"
    };

    const state = Object.assign(this.state, date);

    this.props.addPost(state);
  };

  render() {
    const { slug, story_url, post_twitter } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="column">
          <div className="field">
            <label className="label">Slug</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="slug"
                onChange={this.handleChange}
                value={slug}
                required
              />
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-info">
              Create Post
            </button>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">story_url</label>
            <div className="control">
              <input
                className="input"
                type="url"
                name="story_url"
                onChange={this.handleChange}
                value={story_url}
                required
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addPost: e => dispatch(post.addPost(e))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(PostMaker)
);
