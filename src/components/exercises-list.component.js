import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Exercise from './Exercise';

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  const deleteExercise = (id) => {
    Axios.delete('http://localhost:5000/exercises/' + id).then((res) =>
      console.log(res.data)
    );
    setExercises(exercises.filter((el) => el._id !== id));
  };

  useEffect(() => {
    Axios('http://localhost:5000/exercises/')
      .then((res) => {
        setExercises(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const exerciseList = () => {
    return exercises.map((currentExercise) => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
