import React from 'react'
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";
import { LinksCollection } from '../api/links';

class Terms extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            url: ""
        }
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    render() {
        return this.props.isReady ? (
            <div>Hello world! {this.props.test} {this.props.params}

                <br />
                <br />
                <br />

                <input type="text" placeholder="Title" onChange={(e) => {
                    e.preventDefault();
                    this.setState({ title: e.target.value })
                }} />
                <input type="text" placeholder="URL"
                    onChange={(e) => {
                        e.preventDefault();
                        this.setState({ url: e.target.value })
                    }}
                />
                <button onClick={() => {
                    Meteor.call('links.insert', { title: this.state.title, url: this.state.url });
                }} >
                    Add
                </button>

                <br />
                <br />
                <br />

                {this.props.data.map((item, i) => (
                    <div key={i}>
                        <div>{item.title}</div>
                        <div><a href={item.url} >{item.url}</a></div>
                    </div>
                ))}
            </div>
        ) : (
            <div>Loading... </div>
        )
    }
}

export default withTracker(() => {
    const isReady = Meteor.subscribe('linkspublication')
    const data = LinksCollection.find().fetch();
    return { isReady, data };
})(Terms);