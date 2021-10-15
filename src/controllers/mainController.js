const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let offer = products.filter(element => element.category === "in-sale")
		let visited = products.filter(element => element.category === "visited")
		res.render('index', {
			offer,
			visited, 
			toThousand
		})
		
	},
	search: (req, res) => {
		
		const search = req.query.keywords.trim()
		if (search !== '') { 
			const result = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
			res.render('results', {result, toThousand})
		}
		else{
			res.redirect('/')
		}
		
	},
};

module.exports = controller;
