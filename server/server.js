import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import contentSecurityPolicy from 'helmet-csp';
import cors from 'cors';
import connectDB from './config/db.js';
import colors from 'colors';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

import characterRoutes from './routes/characterRoutes.js';
import filmRoutes from './routes/filmRoutes.js';
import planetRoutes from './routes/planetRoutes.js';
import speciesRoutes from './routes/speciesRoutes.js';
import starshipRoutes from './routes/starshipRoutes.js';
import userRoutes from './routes/userRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';

import path from 'path';
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			connectSrc: ["'self'"],
			frameSrc: ["'self'"],
			childSrc: ["'self'"],
			scriptSrc: ["'self'"],
			styleSrc: [
				"'self'",
				// 'https://fonts.googleapis.com',
				// 'https://checkout.stripe.com',
			],
			fontSrc: ["'self'"],
			imgSrc: [
				"'self'",
				'https://vignette.wikia.nocookie.net/',
				'https://starwars-visualguide.com/',
			],
			baseUri: ["'self'"],
		},
		reportOnly: false,
	})
);

app.use('/api/characters', characterRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/planets', planetRoutes);
app.use('/api/species', speciesRoutes);
app.use('/api/starships', starshipRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/client/build')));

	app.get('*', (_req, res) =>
		res.sendFile(path.resolve(__dirname, '/client/build/index.html'))
	);
} else {
	app.get('/', (_req, res) => {
		res.send('API is running...');
	});
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
	)
);
