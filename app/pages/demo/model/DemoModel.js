/**
 * description:
 *   
 *
 * author: 
 * create: 
 * 
 */
'use strict';
var Model = require('leezq-react-model');

class DemoModel extends Model {
    constructor(options) {
      super(options);

      this.API = {

      }

      this.Event = {
          adduser_success_1001: 'adduser:success:1001',
      }
  }
}

module.exports = DemoModel;