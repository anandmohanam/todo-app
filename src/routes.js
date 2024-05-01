import addTask from './components/addTask.vue';
import showTask from './components/showTask.vue';
import singleTask from './components/singleTask.vue';
import status from './components/status.vue';
import reminder from './components/reminder.vue';

export default [
    { path: '/', component: showTask },
    { path: '/add', component: addTask },
    { path: '/task/:id', component: singleTask },
    { path: '/status', component: status },
    { path: '/reminder', component: reminder },
]
