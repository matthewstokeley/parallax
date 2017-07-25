/**
 * [Scroller description]
 * @param {[type]} ineractions [description]
 */
var Scroller = function() {
    this.init().listen();
};

/**
 * [init description]
 * @return {[type]} [description]
 */
Scroller.prototype.init = function() {
    this.ticking = false;
    this.isScroller = false;
    this.pos = 0;
    return this;
};

/**
 * [listen description]
 * @return {[type]} [description]
 */
Scroller.prototype.listen = function() {
    var onScroll = function() {
        this.pos = window.scrollY;
        this.requestTick();
    };
    window.addEventListener('scroll', onScroll.bind(this)); 
    return this;
};

/**
 * [requestTick description]
 * @return {[type]} [description]
 */
Scroller.prototype.requestTick = function() {

    if (!this.ticking) {
      window.requestAnimationFrame(function() {
          events.emit('scroll', null, this.pos);
          this.ticking = false;
      }.bind(this));
    }

    this.ticking = true;
};
