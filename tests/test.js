const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../index');

describe('Server API', () => {
  let productId; // Store the product ID for later use in tests

  it('should create a new product', async () => {
    const response = await request(app)
      .post('/products')
      .send({
        name: 'Test Product',
        price: 20,
        category: 'Books',
        stock: 100
      })
      .set('Accept', 'application/json')
      .expect(201);

    productId = response.body._id; 

    expect(response.body.name).to.equal('Test Product');
  });

  it('should retrieve a list of products', async () => {
    const response = await request(app)
      .get('/products')
      .expect(200);

    expect(response.body).to.be.an('array');
  });

  it('should retrieve an existing product by an id', async () => {
    const response = await request(app)
      .get(`/products/${productId}`) 
      .expect(200);

    expect(response.body).to.be.an('object');
  });

  it('should update an existing product', async () => {
    const updatedName = 'Updated Product Name';
    const response = await request(app)
      .put(`/products/${productId}`) 
      .send({ name: updatedName })
      .expect(200);

    expect(response.body.name).to.equal(updatedName);
  });

  it('should delete an existing product', async () => {
    const response = await request(app)
      .delete(`/products/${productId}`) 
      .expect(200);

    expect(response.body.message).to.equal('Product deleted successfully');
  });


  it('should place an order for a product', async () => {
    // Place an order for the product
    const orderResponse = await request(app)
      .post(`/products/65296a51b97385916ff83e9a/orders`)
      .send({
        quantity: 5,
      })
      .expect(201);

    // orderId = orderResponse.body._id;

    expect(orderResponse.body.message).to.equal('Order placed successfully');

  });

});


