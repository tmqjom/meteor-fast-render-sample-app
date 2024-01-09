import { Meteor } from 'meteor/meteor';
import { FastRender } from 'meteor/communitypackages:fast-render';

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../imports/ui/App';
import { StaticRouter } from "react-router-dom/server";
import Terms from '../imports/ui/Terms';
import Home from '../imports/ui/Home';
import { LinksCollection } from '../imports/api/links';

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {
  // Rendering Client side routes on server
  FastRender.onPageLoad(sink => {
    const TestApp = props => {
      const termsMatch = sink.request.url.pathname.match(/^\/terms\/(.+)$/);
      // Routing on client must match with server routing
      return (
        <StaticRouter location={props.location} >
          {termsMatch ? <App content={<Terms test="test" params={termsMatch[1]} />} />
            : <App content={<Home />} />
          }
        </StaticRouter>
      );
    }

    // sinking the rendered html into the element with id react-target (server rendering)
    // you can try console.log(sink) to see what else you can do with sink
    // learn more about sink here: https://docs.meteor.com/packages/server-render#:~:text=The%20current%20interface,is%20as%20follows%3A
    sink.renderIntoElementById('react-target', renderToString(<TestApp location={sink.request.url} />));
  })

  // Add Methods and Publications here

  Meteor.methods({
    'links.insert'({ title, url }) {
      insertLink({ title, url });
    }
  });

  Meteor.publish('linkspublication', function () {
    return LinksCollection.find({});
  });
});
