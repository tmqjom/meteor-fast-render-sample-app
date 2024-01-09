import React from 'react';
import {
  hydrateRoot
} from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App';
import { FastRender } from 'meteor/communitypackages:fast-render';
import "../imports/ui/routes"

Meteor.startup(() => {
  FastRender.onPageLoad(async sink => {
    const domNode = document.getElementById('react-target');
    hydrateRoot(domNode, <App />)
  })
});


