const mockData = {
  SignUp_complete: {
    firstName: 'Bran',
    lastName: 'Stark',
    email: 'bstark@gmail.com',
    password: '123455678'
  },
  SignUp_noEmail: {
    firstName: 'Bran',
    lastName: 'stark',
    password: '12345678'
  },
  SignUp_noPswd: {
    firstName: 'Bran',
    lastName: 'stark',
    email: 'bstark@gmail.com',
  },
  SignUp_nolastName: {
    firstName: 'Bran',
    email: 'bstark@gmail.com',
    password: '123455678'
  },
  SignUp_nofirstName: {
    lastName: 'Stark',
    email: 'bstark@gmail.com',
    password: '123455678'
  },
  SignUp_emptyPswd: {
    email: 'bstark@gmail.com',
    firstName: 'Bran',
    lastName: 'stark',
    password: ''
  },
  SignUp_emptyfirstName: {
    firstName: '',
    lastName: 'Stark',
    email: 'bstark@gmail.com',
    password: '123455678'
  },
  SignUp_emptylastName: {
    firstName: 'Bran',
    lastName: '',
    email: 'bstark@gmail.com',
    password: '123455678'
  },
  SignUp_emptyEmail: {
    firstName: 'Bran',
    lastName: 'Stark',
    email: '',
    password: '123455678'
  },
  SignUp_ShortPswd: {
    firstName: 'Bran',
    lastName: 'stark',
    email: 'bstark@gmail.com',
    password: 'git'
  },
  SignUp_IntFirstName: {
    firstName: '1234',
    lastName: 'stark',
    email: 'bstark@gmail.com',
    password: 'git'
  },
  SignUp_IntLastName: {
    firstName: 'Bran',
    lastName: '1234',
    email: 'bstark@gmail.com',
    password: 'git'
  },
  SignUp_WhitespaceFirstName: {
    firstName: 'Bran Bob',
    lastName: '1234',
    email: 'bstark@gmail.com',
    password: 'git'
  },
  SignUp_WhitespaceLastName: {
    firstName: 'Bran',
    lastName: 'Stark Man',
    email: 'bstark@gmail.com',
    password: 'git'
  },

  // Sign In

  SignUp_complete2: {
    firstName: 'Ben',
    lastName: 'Gisa',
    email: 'bengisa@gmail.com',
    password: 'monsieurmsolin'
  },
  Login_complete: {
    email: 'bengisa@gmail.com',
    password: 'monsieurmsolin'
  },
  Login_noEmail: {
    password: 'monsieurmsolin'
  },
  Login_noPassword: {
    email: 'bengisa@gmail.com'
  },
  Login_wrongPswd: {
    email: 'bengisa@gmail.com',
    password: 'mistermsolin'
  },

  Login_wrongEmail: {
    email: 'brucesangwa@gmail.com',
    password: 'udontevenknow'
  },

  //Entries MockData


   Entry_SignUp: {
    firstName: 'Baraka',
    lastName: 'Mugisha',
    email: 'mugishaje@gmail.com',
    password: '12345678'
  },
  Entry_SignUp2: {
    firstName: 'James',
    lastName: 'Nyagatare',
    email: 'jimnyagtr@gmail.com',
    password: 'complicatedpassword'
  },
  Entry_SignUp3: {
    firstName: 'James',
    lastName: 'Nyagatare',
    email: 'nkundi@gmail.com',
    password: 'mymydpassword'
  },
  Entry_SignUp4: {
    firstName: 'Nkurunziza',
    lastName: 'Daniel',
    email: 'nkuru@gmail.com',
    password: 'minepassword'
  },
  Entry_SignUp5: {
    firstName: 'Kamamanzi',
    lastName: 'joshua',
    email: 'kamanzi@gmail.com',
    password: 'kamanzipassword'
  },
  Entry_SignUp6: {
    firstName: 'Muhire',
    lastName: 'Joseph',
    email: 'jojo@gmail.com',
    password: 'jojopassword'
  },
  Entry_1: {
    title: 'Just a sign',
    description: 'Looking at the world through my rearview, searching for an answer up high, or is it all wasted time?'
  },
  Entry_2: {
    title: 'Just a sign',
    description: 'Looking at the world through my rearview, searching for an answer up high, or is it all wasted time?'
  },
  Entry_titleEmpty: {
    title: '',
    description: 'Looking at the world through my rearview, searching for an answer up high, or is it all wasted time?'
  },
  Entry_descriptionEmpty: {
    title: 'Just a sign',
    description: ''
  },
  Entry_missingTitle: {
    description: 'Looking at the world through my rearview, searching for an answer up high, or is it all wasted time?'
  },
  Entry_missingDescription: {
    title: 'Just a sign'
  },
};

export default mockData;