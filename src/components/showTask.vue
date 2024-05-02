<template>
  <div id="show-Task">
    <h1>All Tasks</h1>
    <input type="text" v-model="search" placeholder="Search tasks" />
    <select v-model="statusFilter" class="filter">
      <option value="">All Status</option>
      <option value="Completed">Completed</option>
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Not Updated">Not Updated</option>
      
    </select>
    <router-link v-for="task in filteredTasks" :to="'/task/' + task.id" :key="task.id">
      <div :class="['single-task', getTaskColor(task.status)]">
        <h2>{{ task.title }}</h2>
        <article>
          <p>{{ task.description }}</p>
          <p>Deadline: {{ task.deadline }}</p>
          <h4>Status: {{ task.status }}</h4>
        </article>
      </div>
    </router-link>
  </div>
</template>

<script>
  // Imports
  import searchMixin from '../mixins/searchMixin';

  export default {
    data() {
      return {
        tasks: [],
        search: '',
        statusFilter: '',
      };
    },
    created() {
      this.fetchTasks();
    },
    mixins: [searchMixin],
    computed: {
      filteredTasks: function() {
        let filtered = this.tasks;

        // Apply search filter
        if (this.search) {
          filtered = filtered.filter(task => {
            return task.title.toLowerCase().includes(this.search.toLowerCase()) ||
                   task.description.toLowerCase().includes(this.search.toLowerCase());
          });
        }

        // Apply status filter
        if (this.statusFilter !== '') {
          filtered = filtered.filter(task => task.status === this.statusFilter);
        } else if (this.statusFilter === 'Not Updated') {
          filtered = filtered.filter(task => !task.status);
        }

        return filtered;
      }
    },
    methods: {
      fetchTasks() {
        this.$http.get('https://todo-982a8-default-rtdb.firebaseio.com/posts.json')
          .then(response => response.json())
          .then(data => {
            const tasksArray = [];
            for (let key in data) {
              data[key].id = key;
              tasksArray.push(data[key]);
            }
            this.tasks = tasksArray;
          })
          .catch(error => {
            console.error('Error fetching tasks:', error);
          });
      },
      getTaskColor(status) {
        switch (status) {
          case 'Completed':
            return 'task-completed';
          case 'Pending':
            return 'task-pending';
          case 'In Progress':
            return 'task-in-progress';
          default:
            return '';
        }
      }
    }
  };
</script>

<style scoped>
  #show-Task {
    max-width: 800px;
    margin: 0 auto;
  }
  .single-task {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    border: 1px dotted #aaa;
  }
  #show-Task a {
    color: #444;
    text-decoration: none;
  }
  input[type="text"] {
    padding: 8px;
    width: 30%;
    box-sizing: border-box;
  }
  .filter {
    padding: 8px;
    width: 20%;
    box-sizing: border-box;
  }

  /* Colors based on task status */
  .task-completed {
    background-color: lightgreen;
  }
  .task-in-progress {
    background-color: lightblue;
  }
  .task-pending {
    background-color: lightyellow;
  }
</style>
