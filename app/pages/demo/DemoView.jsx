/**
 * [React description]
 * @type {[type]}
 */
// var React = require('react');

import React from 'react';
import Template from 'template_path/Template.jsx';

import './style/index.less';

var Domo = React.createClass({
    render: function() {
        return (
            <div>
                hello world !
                <a href="javascript:;" onClick={this.load_info}>load info...</a>
            </div>
        );
    },

    load_info: function() {
        $('body').append(`<div id="load_info"></div>`);
        var load = require("bundle?name=domo!./Domo.jsx");
        load(function(file) { });
    }

});

React.render(
    <Template
        content={<Domo />} />
    , document.body
    );
