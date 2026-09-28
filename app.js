// Shared data layer for the Fitness Tracker app.
// Workouts are persisted in localStorage under 'workouts'.

const STORAGE_KEY = 'workouts';

function getWorkouts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveWorkouts(workouts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
}

function addWorkout(workout) {
  const workouts = getWorkouts();
  workout.id = Date.now().toString();
  workouts.push(workout);
  saveWorkouts(workouts);
}

function updateWorkout(id, updated) {
  const workouts = getWorkouts().map(w => (w.id === id ? { ...w, ...updated } : w));
  saveWorkouts(workouts);
}

function deleteWorkout(id) {
  saveWorkouts(getWorkouts().filter(w => w.id !== id));
}

function getWorkoutById(id) {
  return getWorkouts().find(w => w.id === id);
}

// Seed a few sample records the first time the app runs, so pages aren't empty.
function seedIfEmpty() {
  if (getWorkouts().length === 0) {
    saveWorkouts([
      { id: '1', date: '2026-09-10', type: 'Running', duration: 30, calories: 300, notes: 'Morning jog around the park' },
      { id: '2', date: '2026-09-11', type: 'Weights', duration: 45, calories: 220, notes: 'Upper body day' },
      { id: '3', date: '2026-09-12', type: 'Cycling', duration: 60, calories: 450, notes: '' },
    ]);
  }
}
