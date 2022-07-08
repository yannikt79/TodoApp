import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Keyboard, ScrollView } from 'react-native';
import React, { useState } from "react";
import Task from "./Task";
import OwnInputField from './OwnInputField';

export default function App() {
  const [task, setTask] = useState([]);
  const createTask = (tasklist) => {
    if (tasklist == null) return;
    setTask([task, tasklist])
    Keyboard.dismiss();
  }
  const deleteTask = (deleteCounter) => {
    setTask(task.filter((value,counter)=> counter != deleteCounter));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TODO LIST</Text>
      <ScrollView style={styles.sv}>{
        task.map((task, counter) => {
          return (
            <View key={counter} style={styles.task}>
              <Task counter={counter + 1} task={task} deleteTask={() => deleteTask(counter)} />
            </View>
          );
        })
      }
      </ScrollView>
      <OwnInputField createTask={createTask} />
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