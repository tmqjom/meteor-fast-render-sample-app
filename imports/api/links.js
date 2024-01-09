import { Mongo } from 'meteor/mongo';

export const LinksCollection = new Mongo.Collection('links');
export const TestCollection = new Mongo.Collection('testcollection');