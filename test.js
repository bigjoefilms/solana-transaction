const person = {
    firstName: 'john',
    lastName: 'doe',
    age: 25,
    greetings: () => {
      console.log(`hello ${this.firstName}`);
    }
  };
  
  person.greetings();