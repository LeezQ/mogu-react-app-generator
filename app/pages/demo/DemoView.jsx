/**
 * [React description]
 * @type {[type]}
 */
var React = require('react');

var Tempalte = require('template_path/Template.jsx');

require('./style/index.less');

var ContentView = React.createClass({

    render: function() {
        return (
            <div className="demo">
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
