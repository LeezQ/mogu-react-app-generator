/**
 * [React description]
 * @type {[type]}
 */
// var React = require('react');

import React from 'react';
import Template from 'template_path/Template.jsx';

import './style/index.less';

class HelloWorld extends React.Component {
    render() {
       return <p>Hello, world!</p>;
    }
}

var ContentView = React.createClass({

    render: function(y=12) {
        let a = 123;
        return (
            <div className="demo">
                <HelloWorld />
                Page Demo ssContent. {a} {y}!
            </div>
        );
    }

});


React.render(
    <Template 
        content={<ContentView />} />
    , document.body
    );
