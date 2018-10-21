var property = require('../models/property');
var _ = require('lodash');

var mainController = () => {

    var post = (req, res) => {
        if (req.body == undefined) {
            res.status(400);
            res.send({ 'error': 'Could not decode request: JSON parsing failed' });
        }
        else {
            var properties = req.body.payload;
            var error = false;
            if(!_.isArrayLike(properties)){
                error = true;
                res.status(400).send({ 'error': 'Could not decode request: JSON parsing failed' });
            }
            let propertyParams = Object.getOwnPropertyNames(property);            
            properties.forEach(x => { 
               if((_.difference(propertyParams, Object.getOwnPropertyNames(x))).length>0)
               {
                res.status(400).send({ 'error': 'Could not decode request: JSON parsing failed' });
                error = true;
               }
            });

            if (error == false) {
                try {
                    var filteredProperties = properties.filter(x => x.workflow == 'completed' && x.type == 'htv');

                    var result = [];
                    filteredProperties.forEach(element => {
                        result.push({
                            address: `${element.address.buildingNumber} ${element.address.street}, ${element.address.suburb} ${element.address.state} ${element.address.postcode}`,
                            type: element.type,
                            workflow: element.workflow
                        })
                    });

                    res.status(200);
                    res.json(result);
                } catch (error) {
                    res.status(400).send({ 'error': 'Could not decode request: JSON parsing failed' });
                }

            }

        }

    };

    return {
        _post: post
    }

}


module.exports = mainController;

