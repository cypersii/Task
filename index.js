const mongoose = require('mongoose');
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');


const app= express();
app.use(express.json())

const databaseUrl = 'mongodb+srv://cy00r:eetFU8JJc4gGm2XS@cluster0.3gmsr.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(databaseUrl,{
	useNewUrlParser:true,
	useUnifiedTopology:true,
})
	.then(()=>{
		console.log('Database connected')
	})
	.catch((e)=>{
		console.log(e)
		console.log('MONGO CONNECTION UNSUCESSFULL')
	})


app.use('/',productRoutes);
app.use('/',orderRoutes);


app.listen(3000,()=>{
	console.log('SERVER IS LISTINING ON PORT: 3000')
})

module.exports = app;