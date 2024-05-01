<template>
    <div id="single-task">
      <h1>{{ task.title }}</h1>
      <p>Description: {{ task.description }}</p>
    </div>
  </template>
  
  <script>
  // Imports
  import searchMixin from '../mixins/searchMixin';
  
  export default {
    data() {
      return {
        id: this.$route.params.id,
        task: {}
      };
    },
    created() {
      const id = this.$route.params.id;
      this.fetchTask(id);
      // apiUrl: process.env.VUE_APP_API_BASE_URL
    },
    methods: {
      fetchTask(id) {
  this.$http.get(`https://todo-982a8-default-rtdb.firebaseio.com/posts/${id}.json`)
    .then(response => response.json())
    .then(data => {
      this.task = data;
    })
    .catch(error => {
      console.error('Error fetching task:', error);
    });
}


    }
  };
  </script>
  
  <style>
  #single-task {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
    background: #eee;
    border: 1px dotted #aaa;
  }
  </style>
  