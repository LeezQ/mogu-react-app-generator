/**
 * [React description]
 * @type {[type]}
 */
var React = require('react');

var Tempalte = require('template_path/Template.jsx');


var ContentView = React.createClass({

    render: function() {
        return (
            <div>
                Page Demo Content.
            </div>
        );
    }

});


React.render(
    <Tempalte 
        content={<ContentView />} />
    , document.body
    );
