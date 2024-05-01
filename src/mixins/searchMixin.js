export default {
    computed: {
      filteredTasks: function() {
        return this.tasks.filter((task) => {
          return task.title.match(this.search);
        });
      },
  
      statusFilteredTasks: function() {
        if (!this.statusFilter) {
          return this.tasks; // Return all tasks if statusFilter is empty
        }
        return this.tasks.filter((task) => {
          return task.status === this.statusFilter;
        });
      }
    }
  };
  