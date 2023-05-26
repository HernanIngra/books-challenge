const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { where } = require('sequelize');
const { validationResult } = require('express-validator')

const mainController = {
  home: (req, res) => {
    let book = db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books});
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

  },
  deleteBook: async (req, res) => {
    await db.Book.destroy({
      where: {
          id: req.params.id
      }
  })
    res.redirect('/');
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: async (req, res) => {
    let authorBooks = await db.Book.findAll({
        include: [{
          association:'authors',
          where: {id: req.params.id}
        }],
        raw: true,
        nest: true,     
        }         
     ) 
    if(authorBooks){
      res.render('authorBooks',{books:authorBooks})
    }else{
      res.send('The author was not found.');
    }
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
        res.redirect('/users/login');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: async (req, res) => {
    let userToLogin = await db.User.findOne({ where: { Email: req.body.email } });
    
    if (userToLogin) {
        let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.Pass);
        if (isOkThePassword) {
            delete userToLogin.Pass;
            req.session.userLogged = userToLogin;
            if (req.body.remember_user) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
            }
            return res.render('profile',{user : req.session.userLogged});
        }else{
            return res.render('login', {
            errors: {
                password: {
                    msg: 'Contraseña incorrecta'
                }
              }

        });
    }} else{

    return res.render('login', {
        errors: {
            Email: {
                msg: 'No se encuentra el email'
            }
        }
    });
}} ,
profile: async (req, res) =>{
  res.render('profile')
},
  edit: async (req, res) => {
    let bookToEdit= await db.Book.findByPk (req.params.id,{
      include: [{association:'authors'}],
      raw: true,
      nest: true      
    })
    if(bookToEdit){
      res.render('editBook', {book:bookToEdit})
    }else{
      res.send('The book was not found.');
    }  
  },
  processEdit: async (req, res) => {
    let bookToEditP = await db.Book.findByPk(req.params.id, {
      include: [{association: "authors"}]
  })
  let books = db.Book.findAll({
    include: [{ association: 'authors' }]
  })
  if(bookToEditP){
    db.Book.update({
      title: req.body.title,
      description: req.body.description,
      cover: req.body.cover,
      }, {where: {id: req.params.id}})  
      return  res.redirect('/');   
  }else {
  res.send('no se encontró el libro')
  } 
  }
};

module.exports = mainController;
