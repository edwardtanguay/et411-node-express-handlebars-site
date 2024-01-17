import express from 'express';
import * as config from './config';
import path from 'path';
import * as model from './model';

const app = express();
const baseDir = process.cwd();

app.set('view engine', 'ejs');
app.set('views', path.join(baseDir, '/src/views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('pages/welcome');
});

app.get('/welcome', (req, res) => {
	res.render('pages/welcome');
});

app.get('/books', async (req, res) => {
	res.render('pages/books', { books: await model.getBooks() });
});

app.get('/book/:idCode', async (req, res) => {
	const idCode = req.params.idCode;
	const books = await model.getBooks();
	const book = books.find(m => m.idCode === idCode);
	res.render('pages/book', { book });
});

app.get('/about', (req, res) => {
	res.render('pages/about', {});
});

app.get('*', (req, res) => {
	res.status(404).render('pages/404');
})

app.listen(config.getPort(), () => {
	console.log(`Listening at http://localhost:${config.getPort()}`);
});