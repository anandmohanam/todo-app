<template>
    <nav>
      <ul>
        <li><router-link to="/" exact>My Task</router-link></li>
        <li><router-link to="/add" exact>Add Task</router-link></li>
        <li><router-link to="/status" exact>Status</router-link></li>
        <li><router-link to="/reminder" exact>Set Reminder</router-link></li>
      </ul>
      
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
       
      };
    },
    
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    text-align: center;
    margin: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #fff;
    text-decoration: none;
    padding: 12px;
    border-radius: 5px;
  }
  nav {
    background: crimson;
    padding: 30px 0;
    margin-bottom: 40px;
  }
  
  </style>
  