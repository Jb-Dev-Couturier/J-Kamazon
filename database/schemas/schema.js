// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import products from './products'
import user from './user';
import order from './order';
import orderItem from './orderItem';
import paymentResults from './paymentResults';
import shippingAddress from './shippingAddress';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    products,
    user,
    order,
    orderItem,
    paymentResults,
    shippingAddress,
  ]),
});
