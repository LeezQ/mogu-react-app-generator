import React from 'react';
import './style/domo2.less';
var HelloWorld = React.createClass({

    render: function() {
        return (
            <div className="domo-loading">
                hellow loading here ! <br />
                hellow loading here ! <br />
                hellow loading here ! <br />
                {Math.random()}
            </div>
        );
    }

});

module.exports = HelloWorld;
