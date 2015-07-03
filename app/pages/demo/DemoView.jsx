/**
 * [React description]
 * @type {[type]}
 */
import React from 'react';
import Template from 'template_path/Template.jsx';

import './style/index.less';

var Demo = React.createClass({
    render: function() {
        return (
            <div>
                hello world !
                <a href="javascript:;" onClick={this.load_info}>load info...</a>
            </div>
        );
    },

    load_info: function() {
        var Domo = require("bundle?name=domo!./Domo.jsx");
        Domo(function(Domo) {
            if ($('#load_info').length <= 0) {
                $('body').append(`<div id="load_info"></div>`);
            }
            React.render(
                <Domo />
                , document.getElementById('load_info')
                );
        });
    }

});

React.render(
    <Template
        content={<Demo />} />
    , document.body
    );
