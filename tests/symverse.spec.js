/**
 * users.spec.js
 */
const should = require('should');
const symjs =  require ('../index.js');

describe('테스트', function () {

    it('should return the statusCode 200', () => {
        symjs.Symverse.version.should.be.equal('0.1');
    });

    it('should return user array', () => {
        symjs.Symverse.tx
    });
});