import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Toolbar from '../toolbar/Toolbar';

import SideDrawer from '../sideDrawer/SideDrawer';

import Backdrop from '../backdrop/Backdrop';

import AccountsUIWrapper from '../ui/AccountsUIWrapper.js';

import { Posts } from '../api/posts.js';

import Post from './Post.js';

class App extends Component {
    //state of the sideDrawer indicating if it's open or closed
    state = {
        sideDrawerOpen: false
    }

    //method for calling insert function for the posts
    handleSubmit(event) {
        event.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('posts.insert', text);

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    //method for getting posts in the queue
    renderPosts() {
        return this.props.posts.map((post) => (
            <Post key={post._id} post={post} />
        ));
    }

    //method for changing the state of the sideDrawer (opening sideDrawer)
    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    };

    //method for changing the state of the sideDrawer to false (closing sideDrawer)
    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false});
    }

    render() {
        let backdrop;

        //if sideDrawer is open - close it
        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler} />
        }

        //function  for counting how many symbols it's left in the textarea
        $(document).ready(function() {
            var text_max = 300;
            $('#textarea_feedback').html(text_max + '/300');

            $('#textarea').keyup(function() {
                var text_length = $('#textarea').val().length;
                var text_remaining = text_max - text_length;

                $('#textarea_feedback').html(text_remaining + '/300');
            });
        });

        return (
            <div className="container" style={{height:'100%'}}>
                <Toolbar drawerToggleClickHandler={this.drawerToggleClickHandler} />

                <SideDrawer show={this.state.sideDrawerOpen} />
                {backdrop}

                <main>
                    <div className="welcome" id="section_1">
                        <h1>Welcome back!</h1>
                        <a href="#section_2">
                            <img src='expand-button.png'/>
                        </a>
                    </div>

                    <div className="content" id="section_2">
                        <a href="#section_1">
                            <img src='expand-button.png'/>
                        </a>

                        <div className="board">
                            { this.props.currentUser ?
                                <>
                                <form id="newPost" className="new-post" onSubmit={this.handleSubmit.bind(this)} >

                                    <textarea
                                        ref="textInput"
                                        placeholder="What are you thinking about?"
                                        maxLength="300"
                                        id="textarea"
                                        />

                                    <button className="button" type="submit" form="newPost" value="Submit">post</button><br/>

                                    <div id="textarea_feedback"></div>

                                </form>
                                </>: ''
                            }

                            <ul>
                                {this.renderPosts()}
                            </ul>
                        </div>

                        <div className="footer">
                            Egor Filonov, 2018
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

//subscribing to posts and sorting them from newest to oldest
export default withTracker(() => {
    Meteor.subscribe('posts');

    return {
        posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
})(App);
