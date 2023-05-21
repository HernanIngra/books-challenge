const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { where } = require('sequelize');

const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: async (req, res) => {
    let detailBook = await db.Book.findByPk(req.params.id,{
      include: [{association:'authors'}],
      raw: true,
      nest: true      
    })
    if(detailBook){
      return res.render('bookDetail',{book:detailBook})
    }else{
    res.send('The book was not found.');
  }},
  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },
  bookSearchResult: async (req, res) => {
    let query = await db.Book.findOne ({
      where: {
        title: req.body.title
      },
        include: [{association:'authors'}],
        raw: true,
        nest: true          
      
    })
    if(query){
      return res.render('bookDetail',{book:query})
    }else{
      res.send('The book was not found.');
    }
    // Implement search by title (estoy acá)
    /* res.render('search'); */
  },
  deleteBook: (req, res) => {
    // Implement delete book
    res.render('home');
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: (req, res) => {
    // Implement books by author
    res.render('authorBooks');
  },
  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    // Implement login process
    res.render('home');
  },
  edit: (req, res) => {
    // Implement edit book
    res.render('editBook', {id: req.params.id})
  },
  processEdit: (req, res) => {
    // Implement edit book
    res.render('home');
  }
};

module.exports = mainController;
