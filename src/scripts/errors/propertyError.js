import CustomError from './customError';

function PropertyError(property) {
  CustomError.call(this, `Ошибка в свойстве ${property}`);

  this.name = 'PropertyError';
  this.property = property;
}

PropertyError.prototype = Object.create(CustomError.prototype);
PropertyError.prototype.constructor = PropertyError;

export default PropertyError;
