import { StyleSheet, Text, View, Button, Keyboard, ScrollView, Vibration } from 'react-native';
import React, { useEffect, useState } from "react";
import Task from "./Task";
import FixTask from './FixTask';
import OwnInputField from './OwnInputField';
import { Pedometer } from 'expo-sensors';

export default function App(props) {
  const [tasks, setTasks] = useState([]);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setcurrentstepCount] = useState(0);

  useEffect(() => {
    // mount
    _subscribe();

    return (() => {
      // unmount
      _unsubscribe();

    })
  }, [])


  _subscribe = () => {

    _subscription = Pedometer.watchStepCount(result => {
      setCurrentStepCount({
        currentStepCount: result.steps,
      });


    });

    Pedometer.isAvailableAsync().then(
      result => {
        setIsPedometerAvailable({
          isPedometerAvailable: String(result),
        });
      },
      error => {
        setIsPedometerAvailable({
          isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);

    Pedometer.getStepCountAsync(start, end).then(
      result => {
        setPastStepCount({ pastStepCount: result.steps });
      },
      error => {
        setPastStepCount({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };



  const addTask = (task) => {
    if (task == null) return;
    setTasks([...tasks, task]);
    Keyboard.dismiss();
  }

  const deleteTask = (deleteIndex) => {
    setTasks(tasks.filter((value, index) => index != deleteIndex));
    Vibration.vibrate(1);
  }




  return (
    <View style={styles.container}>
      <Text style={styles.header}>TODO LIST</Text>
      <FixTask task={"Do 10'000 steps!"} />

      <ScrollView style={styles.scrollView}>
        {
          tasks.map((task, index) => {
            return (
              <View key={index} style={styles.taskContainer}>



                <Task index={index + 1} task={task} deleteTask={() => deleteTask(index)} />
              </View>
            );
          })
        }
      </ScrollView>
      <OwnInputField addTask={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bcbcf2',
  },
  header: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 30,
  },
  task: {
    marginTop: 25,
  },
  sv: {
    marginBottom: 65,
  }
});