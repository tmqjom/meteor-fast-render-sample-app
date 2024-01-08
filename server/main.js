import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { FastRender } from 'meteor/communitypackages:fast-render';
import React from 'react'; 
import { renderToString } from 'react-dom/server';
import { App } from '../imports/ui/App';

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {
  FastRender.onPageLoad(sink => {
    sink.renderIntoElementById('react-target', renderToString(<App />))
  })


  if (await LinksCollection.find().countAsync() === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://react-tutorial.meteor.com/simple-todos/01-creating-app.html',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });
});
