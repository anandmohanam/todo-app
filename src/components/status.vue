<template>
  <div id="show-Task">
    <h1>All Tasks</h1>
    <input type="text" v-model="search" placeholder="Search tasks" />
    <div v-for="task in tasks" class="single-task" :key="task.id">
      <router-link :to="'/task/' + task.id">
        <h2>{{ task.title }}</h2>
      </router-link>
      <article>
        <p>{{ task.description }}</p>
        <p>Deadline: {{ task.deadline }}</p>
        <button @click="updateStatus(task.id, 'Completed')" class="btn">Mark as Completed</button>
        <button @click="updateStatus(task.id, 'Pending')" class="btn">Mark as Pending</button>
        <button @click="updateStatus(task.id, 'In Progress')" class="btn">In Progress</button>
        <button @click="deleteTask(task.id)" class="btn">Delete</button>
      </article>
    </div>
  </div>
</template>

<script>
import searchMixin from '../mixins/searchMixin';

export default {
  data() {
    return {
      tasks: [],
      search: ''
    };
  },
  created() {
    this.fetchTasks();
  },
  mixins: [searchMixin],
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
    deleteTask(taskId) {
      const apiUrl = 'https://todo-982a8-default-rtdb.firebaseio.com';
      this.$http.delete(`${apiUrl}/posts/${taskId}.json`)
        .then(() => {
          // Remove the task from the tasks array
          this.tasks = this.tasks.filter(task => task.id !== taskId);
        })
        .catch(error => {
          console.error('Error deleting task:', error);
        });
    },
    updateStatus(taskId, status) {
      // Update the status of the task in the database
      this.$http.patch(`https://todo-982a8-default-rtdb.firebaseio.com/posts/${taskId}.json`, { status })
        .then(() => {
          // Update the status of the task locally
          const updatedTask = this.tasks.find(task => task.id === taskId);
          if (updatedTask) {
            updatedTask.status = status;
          }
        })
        .catch(error => {
          console.error('Error updating task status:', error);
        });
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
  background: #eee;
  border: 1px dotted #aaa;
}
#show-Task a {
  color: #444;
  text-decoration: none;
}
input[type="text"] {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

/* Style all buttons */
.btn {
  padding: 8px 16px;
  background-color: #f15348;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #cd0b04;
}
</style>
