import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditExercises = ({ match }) => {
  const userInput = useRef(null);

  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios('http://localhost:5000/exercises/' + match.params.id)
      .then((res) => {
        setUsername(res.data.username);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setDate(new Date(res.data.date));
      })
      .catch((err) => console.error(err));

    axios('http://localhost:5000/users/').then((res) => {
      if (res.data.length > 0) {
        setUsers(res.data.map((user) => user.username));
      }
    });
  }, []);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };
  const onChangeDate = (date) => {
    setDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    console.log(exercise);

    axios
      .put(
        'http://localhost:5000/exercises/update/' + match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));

    // After submiting relocate user to home page
    window.location = '/';
  };

  return (
    <div>
      <h1>Edit Exercise Log</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            ref={userInput}
            required
            className="form-control"
            onChange={onChangeUsername}
            value={username}
          >
            {users.map((user) => {
              return (
                <option key={user} defaultValue={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            required
            className="form-control"
            onChange={onChangeDescription}
            value={description}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes)</label>
          <input
            type="text"
            className="form-control"
            onChange={onChangeDuration}
            value={duration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-primary"
            value="Edit Exercise Log"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercises;
