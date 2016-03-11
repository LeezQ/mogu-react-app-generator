var React = require('react');

var Template = React.createClass({

    render: function() {
        return (
            <div className="body-wrap" id="body-wrap">
                {this.props.content}
            </div>
        );
    }

});

module.exports = Template;
