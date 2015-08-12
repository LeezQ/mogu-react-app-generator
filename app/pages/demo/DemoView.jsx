/**
 * [React description]
 * @type {[type]}
 */
import React from 'react';
import Template from 'template_path/Template.jsx';

import './style/index.less';


var DomoLazy = require("bundle?lazy&name=[name]!./DomoLazy.jsx");

//var LeezQBundleLazy = require('leezq-bundle-lazy');

//var DomoLazy= LeezQBundleLazy.load('./DomoLazy.jsx');

var Demo = React.createClass({
    componentDidMount: function() {
        var length = $('.img-wrap').find('div').length;

        var i = 1;

        var imgShow = function(i) {
            var img = $('.img-wrap').find('div');
            var prev = 0;
            console.log(i);

            if (i > length - 1) {
                i = 0;
            }

            if (i == 0) {
                prev = length - 1;
            } else {
                prev = i - 1;
            }
            console.log(prev);

            img.eq(prev).fadeOut(2000);
            img.eq(i).fadeIn(2000);

            setTimeout(() => {
                i++;
                imgShow(i);
            }, 2000)

        }

        setTimeout(() => {
            imgShow(i);
        }, 1000)



    },
    render: function() {
        return (
            <div>
                <div className="img-wrap">
                    <div style={{backgroundImage: 'url(http://ww2.sinaimg.cn/large/655ff3d8gw1ev06yb68t1j20dw0kuwfr.jpg)'}}  className="is-show"/>
                    <div style={{backgroundImage: 'url(http://ww3.sinaimg.cn/large/655ff3d8gw1ev06za3ew5j20go0p0did.jpg)'}}  />
                    <div style={{backgroundImage: 'url(http://ww1.sinaimg.cn/large/655ff3d8gw1ev06ziqnmxj20de09fgly.jpg)'}}  />
                    <div style={{backgroundImage: 'url(http://ww1.sinaimg.cn/large/655ff3d8gw1ev06zr19whj20e60kqabf.jpg)'}}  />
                    <div style={{backgroundImage: 'url(http://ww3.sinaimg.cn/large/655ff3d8gw1ev0707mmvzj20jg0t6myq.jpg)'}}  />
                    <div style={{backgroundImage: 'url(http://ww2.sinaimg.cn/large/655ff3d8gw1ev070e5ao6j20h80o4jtm.jpg)'}}  />
                </div>

                <div className="bottom-wrap">
                    <div className="month">
                        <i className="fl day">05</i>
                        <div className="year">
                            <p>八月</p>
                            <p>2015</p>
                        </div>
                    </div>

                    <div className="location"> 杭州市西湖区古墩路 </div>

                    <h2 className="title">心游记</h2>

                    <p className="desc">有时觉得每个人的一生都在演一场《西游记》，我们唠叨别人也被别人唠叨，我们说别人是妖怪，也被别人说是妖怪。</p>

                </div>
            </div>
        );
    },

    load_info: function() {

        DomoLazy(function(Alala) {
            if ($('#load_info').length <= 0) {
                $('body').append(`<div id="load_info"></div>`);
            }
            React.render(
                <Alala />
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
