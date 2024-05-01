<template>
  <div id="add-task">
    <h2>Add New Task</h2>
    <form>
      <label>Task Title:</label>
      <input type="text" v-model.lazy="task.title" required />
      <label>Description:</label>
      <textarea v-model.lazy.trim="task.description" @keydown.delete.prevent></textarea>
      <!-- ^^^ Prevent the default behavior of delete key -->
      <label>Deadline:</label>
      <input type="date" v-model.trim="task.deadline" />
      <div class="button-container">
        <button @click.prevent="post">Add Task</button>
        <button @click.prevent="clearForm">Clear</button>
      </div>
    </form>
    
    <div v-if="showAlert" class="alert alert-warning" ref="alertMessage">
      <strong>Warning!</strong> Please fill in all fields.
    </div>
    <div v-if="showAlert1" class="alert alert-success">
      <strong>Success!</strong> Reminder added.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
        deadline: '',
      },
      submitted: false,
      showAlert: false,
      showAlert1: false, // Initially hide the alert
    };
  },
  methods: {
    post: function () {
      if (!this.task.title || !this.task.description || !this.task.deadline) {
        this.showAlert = true; // Show the alert if fields are missing
        setTimeout(() => {
          this.showAlert = false; // Hide the alert after 3 seconds
        }, 3000);
        return;
      }
      // If all fields are filled, proceed with form submission
      const url = 'https://todo-982a8-default-rtdb.firebaseio.com';
      this.$http
        .post(`${url}/posts.json`, this.task)
        .then((response) => {
          this.showAlert1 = true;
          setTimeout(() => {
            this.showAlert1 = false;
          }, 3000);

          console.log(response);
          this.submitted = true;
        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });
    },
    clearForm: function () {
      // Reset task object to clear the form
      this.task.title = '';
      this.task.description = '';
      this.task.deadline = '';
    }
  },
};
</script>

<style scoped>
#add-task {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}

label {
  display: block;
  margin: 20px 0 10px;
}

input[type="text"],
textarea,
select {
  display: block;
  width: 80%;
  padding: 8px;
}

textarea {
  height: 200px;
}

h3 {
  margin-top: 10px;
}

button {
  display: inline-block; /* Make buttons inline-block */
  margin: 20px 10px 0 0; /* Add margin between buttons */
  background: crimson;
  color: #fff;
  border: 0;
  padding: 14px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}

.alert {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.alert-warning {
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
}

.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}
</style>
