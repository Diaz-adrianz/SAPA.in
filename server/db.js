import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const ConnDB = async () => {
	try {
		const con = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('SUCCESS: Database connected!');
	} catch (error) {
		console.log('ERR: ' + error.message);
		process.exit();
	}
};

export default ConnDB;
