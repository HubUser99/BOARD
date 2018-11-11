import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts.js';

// Task component - represents a single todo item
export default class Post extends Component {

    deleteThisPost() {
        Meteor.call('posts.remove', this.props.post._id);
    }

    render() {
        var month = this.props.post.createdAt.getUTCMonth() + 1;
        return (
            <div style={{marginTop: "40px"}}>
                <div className="text">
                    @<strong>{this.props.post.username}</strong>
                <div className="text-content">
                    {this.props.post.text}
                </div>
                <div className="text-time">

                    {month.toString()}.
                    {this.props.post.createdAt.getUTCDate().toString()}.
                    {this.props.post.createdAt.getUTCFullYear().toString()}
                </div>
                <a className="delete" onClick={this.deleteThisPost.bind(this)}>
                    delete post
                </a>
            </div>
        </div>
    );
}
}
