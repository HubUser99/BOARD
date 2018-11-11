import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
    //this code only runs on the server
    Meteor.publish('posts', function postsPublication() {
        return Posts.find();
    });
}

Meteor.methods({
    'posts.insert'(text) {
        check(text, String);

        //make sure the user is logged in before inserting a post
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Posts.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'posts.remove'(postId) {
        check(postId, String);

        const post = Posts.findOne(postId);
        if (post.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Posts.remove(postId);
    },
});
