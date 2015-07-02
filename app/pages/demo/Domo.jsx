import React from 'react';
import './style/domo2.less';
var HelloWorld = React.createClass({

    render: function() {
        return (
            <div className="domo-loading">
                hellow loading here ! <br />
                hellow loading here !
            </div>
        );
    }

});

React.render(
    <HelloWorld />
    , document.getElementById('load_info')
    );
