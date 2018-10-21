const chai= require('chai');
const should = chai.should();
const expect = chai.expect;
const sinon = require('sinon');
const mainController = require('../controller/mainController')();

describe('main controller tests', function(){
    context('empty request body',function(){
        it('should return 400 on an empty request object',function(){

            var req ={};

            var res= {
                status: sinon.spy(),
                send : sinon.spy()
            };
            mainController._post(req,res);
            res.status.calledWith(400).should.equal(true);
            res.send.calledWith({'error':'Could not decode request: JSON parsing failed'}).should.equal(true);
        });
    })


    context('post',function(){
        it('should return a value',function(){
            var req,res,spy;

            req = {};
            var res= {
                status: sinon.spy(),
                send : sinon.spy()
            };
            spy = res.send = sinon.spy();
    
            mainController.po(req, res);
            expect(spy.calledOnce).to.equal(true);
        })
    })
})