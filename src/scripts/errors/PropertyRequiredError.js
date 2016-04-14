import PropertyError from './propertyError';

function PropertyRequiredError(property) {
  PropertyError.call(this, property);

  this.name = 'PropertyRequiredError';
  this.message = `Отсутствует свойство ${property}`;

}

PropertyRequiredError.prototype = Object.create(PropertyError.prototype);
PropertyRequiredError.prototype.constructor = PropertyRequiredError;

export default PropertyRequiredError;
