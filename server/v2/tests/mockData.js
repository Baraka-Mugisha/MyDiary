const mockData = {
  SignUp_perfect: {
    firstName: 'Emmanuel',
    lastName: 'Christophe',
    email: 'Christophe@gmail.com',
    password: 'pass1234'
  },
  SignUp_withoutEmail: {
    firstName: 'Emmanuel',
    lastName: 'Christophe',
    password: 'pass1234'
  },
  SignUp_withoutPswd: {
    firstName: 'Emmanuel',
    lastName: 'Christophe',
    email: 'Christophe@gmail.com',
  },
  SignUp_withoutlastName: {
    firstName: 'Emmanuel',
    email: 'Christophe@gmail.com',
    password: 'pass1234'
  },
  SignUp_withoutfirstName: {
    lastName: 'Christophe',
    email: 'Christophe@gmail.com',
    password: 'pass1234'
  },
  SignUp_withVoidPswd: {
    email: 'Christophe@gmail.com',
    firstName: 'Emmanuel',
    lastName: 'Christophe',
    password: ''
  },
  SignUp_withVoidfirstName: {
    firstName: '',
    lastName: 'Christophe',
    email: 'Christophe@gmail.com',
    password: 'pass1234'
  },
  SignUp_withVoidlastName: {
    firstName: 'Emmanuel',
    lastName: '',
    email: 'Christophe@gmail.com',
    password: 'pass1234'
  },
  SignUp_withVoidEmail: {
    firstName: 'Emmanuel',
    lastName: 'Christophe',
    email: '',
    password: 'pass1234'
  },
  SignUp_ShortPswd: {
    firstName: 'Emmanuel',
    lastName: 'Christophe',
    email: 'Christophe@gmail.com',
    password: 'pass'
  },
  SignUp_IntFirstName: {
    firstName: '1234',
    lastName: 'Christophe',
    email: 'Christophe@gmail.com',
    password: 'pass1234'
  },
  SignUp_IntLastName: {
    firstName: 'Emmanuel',
    lastName: '1234',
    email: 'Christophe@gmail.com',
    password: 'pass1234'
  },
  SignUp_WhitespaceFirstName: {
    firstName: 'Emmanuel Dede',
    lastName: '1234',
    email: 'Christophe@gmail.com',
    password: 'pass1234'
  },
  SignUp_WhitespaceLastName: {
    firstName: 'Emmanuel',
    lastName: 'Christophe Dede',
    email: 'Christophe@gmail.com',
    password: 'pass1234'
  },
  SignUp_perfect2: {
    firstName: 'pierre',
    lastName: 'Dominic',
    email: 'pierre@gmail.com',
    password: 'pass12345'
  },
  Login_wrongToken: {
    token: 'hasuwyuebfncx nzcskdfweiyfertrjgkdsoowueresdgshdfjhswieri'
  },
  Login_wrongEmail: {
    email: 'memory@gmail.com',
    password: 'dash1234'
  },
  Login_wrongPassword: {
    email: 'Christophe@gmail.com',
    password: 'dash1234'
  },
  Login_perfect: {
    email: 'Christophe@gmail.com',
    password: 'pass1234'
  },
  Entry_SignUp: {
    firstName: 'Baraka',
    lastName: 'Uwimana',
    email: 'mugishaje@gmail.com',
    password: 'pass1234'
  },
  Entry_SignUp2: {
    firstName: 'Kamana',
    lastName: 'Didier',
    email: 'KamaDi@gmail.com',
    password: 'pass12345'
  },
  Entry_SignUp3: {
    firstName: 'Kamana',
    lastName: 'Didier',
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
    title: 'This is my title',
    description: 'This is my description of of my diary entry'
  },
  Entry_2: {
    title: 'This is my title',
    description: 'This is my description of of my diary entry'
  },
  Entry_titleEmpty: {
    title: '',
    description: 'This is my description of of my diary entry'
  },
  Entry_descriptionEmpty: {
    title: 'This is my title',
    description: ''
  },
  Entry_missingTitle: {
    description: 'This is my description of of my diary entry'
  },
  Entry_missingDescription: {
    title: 'This is my title'
  },
};

export default mockData;
