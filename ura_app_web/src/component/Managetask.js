import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,

} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import * as action from './action/action';
import Constant from '../Constants/Constant';
import { Fonts } from './Fonts';


class Managetask extends Component {
    state = {
        dataSource: [],
        isLoading: true,
        listcolor: '',
        listtxt: 'green',
        names: [],
        taskbtn: '',
        managebtn: '',
        allbtn: '',
        alltxt: '',
        listcolor: '',
        listtxt: '',
        grouplist: [],

    };

    componentDidMount() {
        var thatObj = this;
        var uservalues = thatObj.props.LoginData.data;
        this.setState({ managebtn: '#000000', taskbtn: 'gray' });
        console.log("uservalues", uservalues)


        axios({
            method: 'GET',
            url: Constant.base_url + '/smartcontracts/me/tasks/' + uservalues.users.name,
            Headers: {
                "Content-Type": "application/json",
            }

        }).then(({ data }) => {
            console.log('successdata of manage task:', data)
            thatObj.setState({ names: data.myTasks })
            console.log('namearray:', thatObj.state.names)
        }).catch((err) => {
            console.log('errors', err)
        });
    }


    selecttask(selecteditem) {
        console.log('selecteditem', selecteditem);
        // this.props.navigation.navigate('Waitingforapprove');
        const { navigate } = this.props.navigation;
        navigate('Waitingforapprove');
    }
    render() {
        return (
            <View>
                <FlatList showsVerticalScrollIndicator={false}

                    data={this.state.names}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity style={{
                            padding: 10, marginRight: '5%', marginLeft: '5%', marginTop: '3%',
                            backgroundColor: 'white', borderRadius: 15
                        }}
                            onPress={() => this.selecttask(item)}
                        >

                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ width: '60%' }}>
                                    <Text style={{ fontSize: 15, fontFamily: Fonts.AvenirLTStdBlack, color: '#000000' }} >{item.name}</Text>
                                    <Text style={{ fontSize: 14, }}>expires in {item.expiryDate}</Text>
                                    <Text style={{ color: 'blue' }}>NEW </Text>
                                </View>
                                <View style={{ width: '40%', alignItems: 'flex-end' }}>
                                    <Text style={styles.text1} >{item.ura.toFixed(3)} URA</Text>
                                    <Text style={styles.times} >${item.usd} USD</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    roleImg: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        resizeMode: 'contain',


    },
    role: {

        fontFamily: 'Avenir LT Std',

    },

    text1: {
        fontSize: 18,
        color: '#000000',
        fontFamily: Fonts.AvenirLTStdBlack,

    },
    times: {
        fontSize: 18,
        fontFamily: Fonts.AvenirLTStdRoman,
        color: '#000000'
    },

})

const StateToProps = (state) => {
    return {
        LoginData: state.LoginUser,
        data: state.data,


    }
}

const DispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(StateToProps, DispatchToProps)(Managetask);