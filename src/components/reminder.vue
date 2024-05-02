<template>
  <div id="add-reminder">
    <h2>Add Reminder</h2>
    <!-- Form for adding a new reminder -->
    <form v-if="!submitted">
      <label for="note">Reminder Note:</label>
      <input type="text" id="note" v-model="reminder.note" required />

      <label for="interval">Time:</label>
      <select id="interval" v-model="reminder.selectedInterval" required>
        <option value="">Select Interval</option>
        <option value="5">5 Seconds</option>
        <option value="10">10 Seconds</option>
        <option value="60">1 Minute</option>
        <option value="600">10 Minutes</option>
        <option value="1200">20 Minutes</option>
        <option value="3600">1 Hour</option>
      </select>
      
      <!-- Buttons container -->
      <div class="button-container">
        <!-- Add reminder button -->
        <button @click.prevent="post" class="btn">Add Reminder</button>
        <!-- Clear button -->
        <button @click.prevent="clearForm" class="btn">Clear</button>
      </div>
      
      <!-- Success alert when reminder is added -->
      <div v-if="showAlert1" class="alert alert-success">
        <strong>Success!</strong> Reminder added.
      </div>
    </form>

    <!-- Warning alert for incomplete form -->
    <div v-if="showAlert" class="alert alert-warning">
      <strong>Warning!</strong> Please fill in all fields.
    </div>

    <!-- Display all reminders -->
    <div v-for="reminder in reminders" :key="reminder.id" class="reminder">
      <p><strong>Note:</strong> {{ reminder.note }}</p>
      <p><strong>Time Set:</strong> {{ reminder.selectedInterval }} seconds</p>
      <!-- Delete button for each reminder -->
      <button @click="deleteReminder(reminder.id)" class="btn-delete">Delete</button>
    </div>

    <!-- Audio Alert -->
    <audio ref="alertSound">
      <source src="../assets/alert.wav" type="audio/wav">
    </audio>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      reminder: {
        note: '',
        selectedInterval: ''
      },
      submitted: false,
      showAlert: false,
      showAlert1: false,
      reminders: []
    };
  },
  methods: {
    // Method to add a new reminder
    post() {
      if (!this.reminder.note || !this.reminder.selectedInterval) {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
        return;
      }

      // Simulated API endpoint URL
      const url = 'https://todo-982a8-default-rtdb.firebaseio.com';
      
      // Simulated POST request
      // Assume this.$http.post sends a POST request to the server
      this.$http.post(`${url}/reminder.json`, this.reminder)
        .then(response => {
          // Show success alert
          this.showAlert1 = true;
          setTimeout(() => {
            this.showAlert1 = false;
          }, 3000);
          // Fetch updated reminders after adding a new one
          this.fetchReminders();
        })
        .catch(error => {
          console.error('Error adding reminder:', error);
        });
    },
    // Method to fetch all reminders
    fetchReminders() {
      // Simulated GET request to fetch reminders
      this.$http.get('https://todo-982a8-default-rtdb.firebaseio.com/reminder.json')
        .then(response => response.json())
        .then(data => {
          const remindersArray = [];
          for (let key in data) {
            data[key].id = key;
            data[key].remainingTime = data[key].selectedInterval; // Add remaining time property
            remindersArray.push(data[key]);
            this.startCountdownTimer(data[key]); // Start countdown timer for each reminder
          }
          this.reminders = remindersArray;
        })
        .catch(error => {
          console.error('Error fetching reminders:', error);
        });
    },
    // Method to start countdown timer for a reminder
    startCountdownTimer(reminder) {
      reminder.timer = setInterval(() => {
        if (reminder.remainingTime <= 0) {
          clearInterval(reminder.timer); // Stop the timer
          this.showReminderAlert(reminder); // Show reminder alert when time is up
          this.deleteReminder(reminder.id); // Delete the reminder after the alert
        } else {
          reminder.remainingTime--;
        }
      }, 1000); // Update every second
    },
    // Method to delete a reminder
    deleteReminder(reminderId) {
      const apiUrl = `https://todo-982a8-default-rtdb.firebaseio.com/reminder/${reminderId}.json`;
      // Simulated DELETE request
      this.$http.delete(apiUrl)
        .then(() => {
          // Fetch updated reminders after deleting one
          this.fetchReminders();
        })
        .catch(error => {
          console.error('Error deleting reminder:', error);
        });
    },
    // Method to show reminder alert with audio
    showReminderAlert(reminder) {
      const audio = this.$refs.alertSound;
      audio.play(); // Play audio alert
      window.alert(`Reminder "${reminder.note}" reached the set time!`); // Show alert message
      audio.pause(); // Pause audio alert
      this.playAlert();
    },
    // Method to clear form fields
    clearForm() {
      this.reminder.note = '';
      this.reminder.selectedInterval = '';
    },
    // Method to play audio alert
    playAlert() {
  var audio = new Audio('../assets/alert.wav'); // Load audio from assets directory
  audio.loop = true; // Loop the audio

  // Play the audio
  audio.play();

  // Log any errors related to loading or playing audio
  audio.addEventListener('error', function(e) {
    console.error('Error loading audio:', e);
  });
  audio.addEventListener('ended', function() {
    audio.pause(); // Pause the audio when it finishes playing
  });
}

  },
  // Fetch reminders when the component is created
  created() {
    this.fetchReminders();
  },
  // Clear all timers when component is destroyed
  beforeDestroy() {
    for (let reminder of this.reminders) {
      clearInterval(reminder.timer);
    }
  }
};
</script>

<style scoped>
#add-reminder {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}

label {
  display: block;
  margin: 20px 0 10px;
}

input[type="text"],
select {
  display: block;
  width: 80%;
  padding: 8px;
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

.reminder {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
