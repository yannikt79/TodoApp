
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import Pedometer from './Pedometer';


export default function FixTask(props)  {

    const [steps, setSteps] = useState(0);


    function setAllSteps(count) {

        setSteps(count)
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.indexContainer}>
            </View>
            <View style={styles.taskContainer}>
                <Text style={styles.task}>{props.task}</Text>
                <Text style={styles.task}>{steps}</Text>
                {/*<Pedometer setAllSteps={ () => setAllSteps(count) }></Pedometer> */}
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 15,
    },
    indexContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 10,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    index: {
        color: '#fff',
        fontSize: 20,
    },
    taskContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
        marginTop: 1,
    },
    task: {
        color: '#fff',
        width: '90%',
        fontSize: 16,
    },
    delete: {
        marginLeft: 10,
    },
    pedometer: {
        marginLeft: 10,
    },
});