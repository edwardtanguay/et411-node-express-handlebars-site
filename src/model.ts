import axios from 'axios';
import { IBook } from './interfaces';

export const getBooks = () => {
	const bookUrl = 'https://edwardtanguay.vercel.app/share/books.json';
	return new Promise<IBook[]>(async (resolve, reject) => {
		const response = await axios.get(bookUrl);
		const rawBooks = response.data;
		const books: IBook[] = [];
		for (const rawBook of rawBooks) {
			const book:IBook = {
				idCode: rawBook.idcode,
				title: rawBook.title,
				description: rawBook.description,
				buyUrl: rawBook.buyurl
			}
			books.push(book);
		}
		resolve(books);
	})
}