// Product list item image
var ProductImage = React.createClass({
    getDefaultProps: function() {
        return {
            loader: 'http://sierrafire.cr.usgs.gov/images/loading.gif',
            showImage: false
        };
    },    

    componentDidUpdate: function(prevProps) {
        if (!this.props.showImages && prevProps.viewport) {
            this.updatePosition();
        }
    },

    updatePosition: function() {
        var el = this.getDOMNode();
        this.props.updateImagePosition(el.offsetTop, el.offsetHeight);
    },

    render: function() {
        var img = (this.props.showImage)
            ? this.props.src
            : this.props.loader;
        return (
            <img  alt={this.props.alt} src={img} style={{
                width: '100px',
                height: '100px'
            }}/>
        );
    }
});

// Product list item
var Product = React.createClass({
    getInitialState: function() {
        return {
            showImage: false
        };
    },

    getDefaultProps: function() {
        return {
            showImage: false
        };
    },

    componentWillMount: function() {
// allow image display override
        if (this.props.showImage) {
            setShowImage(true);
        }
    },

    updateImagePosition: function(top, height) {
// image is already displayed, no need to check anything
        if (this.state.showImage) {
            return;
        }

// update showImage state if component element is in the viewport
        var min = this.props.viewport.top;
        var max = this.props.viewport.top + this.props.viewport.height;

        if ((min <= (top + height) && top <= (max - 300))) {
            this.setShowImage(true);
        }
    },

    setShowImage: function(show) {
        this.setState({
            showImage: !!(show)
        });
    },

    render: function() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <div>
                    <ProductImage  alt={this.props.title} showImage={this.state.showImage} src={this.props.image} updateImagePosition={this.updateImagePosition} viewport={this.props.viewport}/>
                </div>
            </div>
        );
    }
});

// Product list
var ProductList = React.createClass({
    getInitialState: function() {
        return {
            viewport: {
                top: 0,
                height: 0
            }
        };
    },

    componentDidMount: function() {
        window.addEventListener('scroll', this.updateViewport, false);
        window.addEventListener('resize', this.updateViewport, false);
        this.updateViewport();
    },

    componentWillUnmount: function() {
        window.removeEventListener('scroll', this.updateViewport);
        window.removeEventListener('resize', this.updateViewport);
    },

    updateViewport: function() {
// TODO: debounce this call
        this.setState({
            viewport: {
                top: window.pageYOffset,
                height: window.innerHeight
            }
        });
    },

    render: function() {
        var self = this;

        var itemViews = this.props.items.map(function(item) {
            return <Product  image={item.image} title={item.title} viewport={self.state.viewport}/>
        });

        return (
            <div>
                <h1>Items</h1>
                {itemViews}
            </div>
        );
    }
});

var items = [
    {
        title: 'Kitten 1',
        image: 'http://placekitten.com/311/313'
    }, {
        title: 'Kitten 2',
        image: 'http://placekitten.com/302/302'
    }, {
        title: 'Kitten 3',
        image: 'http://placekitten.com/303/303'
    }, {
        title: 'Kitten 4',
        image: 'http://placekitten.com/304/304'
    }, {
        title: 'Kitten 5',
        image: 'http://placekitten.com/305/305'
    }, {
        title: 'Kitten 6',
        image: 'http://placekitten.com/306/306'
    }, {
        title: 'Kitten 7',
        image: 'http://placekitten.com/307/307'
    }, {
        title: 'Kitten 8',
        image: 'http://placekitten.com/308/308'
    }, {
        title: 'Kitten 9',
        image: 'http://placekitten.com/310/310'
    }, {
        title: 'Kitten 10',
        image: 'http://placekitten.com/311/311'
    }
];

var el = document.getElementById('content');
React.render(<ProductList  items={items}/>, el);
