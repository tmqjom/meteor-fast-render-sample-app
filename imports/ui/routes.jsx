import { createRoot } from 'react-dom/client';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import App from './App';
import React from 'react';
import Terms from './Terms';
import Home from './Home';

FlowRouter.route('/', {
    name: 'home',
    async action(params) {
        const root = createRoot(document.getElementById('react-target'));
        // Using app as a wrapper for all routes
        root.render(<App content={<Home />} />);
    },
});
// routes parameter usage
// Example: http://localhost:3000/terms/insertIdHere
FlowRouter.route('/terms/:_id', {
    name: 'terms',
    async action(params) {
        const root = createRoot(document.getElementById('react-target'));
        // Using app as a wrapper for all routes
        // Adding parameters to the Terms component
        root.render(<App content={<Terms test="test" params={params._id} />} />);
    },
});