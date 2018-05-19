require("./../lib/swisscalc.lib.format.js");
require("./../lib/swisscalc.lib.operator.js");
require("./../lib/swisscalc.lib.operatorCache.js");
require("./../lib/swisscalc.lib.shuntingYard.js");
require("./../lib/swisscalc.display.numericDisplay.js");
require("./../lib/swisscalc.display.memoryDisplay.js");
require("./../lib/swisscalc.calc.calculator.js");

import React from "react";
import {View, Text, StyleSheet, Dimensions, PanResponder} from "react-native";
import {CalcButton, CalcDisplay} from "./../components";



export default class CalculatorScreen extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            display:'0',
            orientation: 'portrait'
        };
        //initialize calculator
        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();

        //initialize panResponder
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                if(Math.abs(gestureState.dx) >= 50){
                    this.onBackSpacePress();
                }
              },
        });

        Dimensions.addEventListener('change', ()=>{
            const {width, height} = Dimensions.get('window');
            let orientation = (width > height) ? 'landscape' : 'portrait';
            this.setState({orientation: orientation});
        });
    }
    //handles digit presses
    onDigitPress = (digit) =>{
        this.calc.addDigit(digit);
        this.setState({display: this.calc.getMainDisplay()});
    }
    //handles display clearing
    onClearPress = () =>{
        this.calc.clear();
        this.setState({display: this.calc.getMainDisplay()});
    }
    //handles plus/minus
    onPlusMinusPress = () =>{
        this.calc.negate();
        this.setState({display: this.calc.getMainDisplay()});
    }
    //handles operators
    onBinaryOperatorPress = (operator) =>{
        this.calc.addBinaryOperator(operator);
        this.setState({display: this.calc.getMainDisplay()});
    }
    //handles unuary operators
    onUnaryOperatorPress = (operator) =>{
        this.calc.addUnaryOperator(operator);
        this.setState({display: this.calc.getMainDisplay()});
    }
    //handles equals
    onEqualsPress = () =>{
        this.calc.equalsPressed();
        this.setState({display: this.calc.getMainDisplay()});
    }
    //handles backspace
    onBackSpacePress = () =>{
        this.calc.backspace();
        this.setState({display: this.calc.getMainDisplay()});
    }

    renderPortrait(){
        return(
            <View style={{flex: 1}}>
            <View style={styles.displayContainer} {...this.panResponder.panHandlers}>
            <CalcDisplay display={this.state.display} />
            </View>
            
            <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
            <CalcButton onPress={this.onClearPress} title="C" color="white" backgroundColor="#DCC894"/>
            <CalcButton onpPress={this.onPlusMinusPress} title="+/-" color="white" backgroundColor="#DCC894"/>
            <CalcButton onPress={() =>{this.onUnaryOperatorPress(this.oc.PercentOperator)}} title="%" color="white" backgroundColor="#DCC894"/>
            <CalcButton onPress={() =>{this.onBinaryOperatorPress(this.oc.DivisionOperator)}} title="/" color="white" backgroundColor="#DCA394"/>
            </View>

            <View style={styles.buttonRow}>
            <CalcButton onPress={() =>{this.onDigitPress('7')}} title="7" color="white" backgroundColor="#607D8B"/>
            <CalcButton onPress={() =>{this.onDigitPress('8')}} title="8" color="white" backgroundColor="#607D8B"/>
            <CalcButton onPress={() =>{this.onDigitPress('9')}} title="9" color="white" backgroundColor="#607D8B"/>
            <CalcButton onPress={() =>{this.onBinaryOperatorPress(this.oc.MultiplicationOperator)}} title="*" color="white" backgroundColor="#DCA394"/>
            </View>

            <View style={styles.buttonRow}>
            <CalcButton onPress={() =>{this.onDigitPress('4')}} title="4" color="white" backgroundColor="#607D8B"/>
            <CalcButton onPress={() =>{this.onDigitPress('5')}} title="5" color="white" backgroundColor="#607D8B"/>
            <CalcButton onPress={() =>{this.onDigitPress('6')}} title="6" color="white" backgroundColor="#607D8B"/>
            <CalcButton onPress={() =>{this.onBinaryOperatorPress(this.oc.SubtractionOperator)}} title="-" color="white" backgroundColor="#DCA394"/>
            </View>

            <View style={styles.buttonRow}>
            <CalcButton onPress={() =>{this.onDigitPress('1')}} title="1" color="white" backgroundColor="#607D8B"/>
            <CalcButton onPress={() =>{this.onDigitPress('2')}} title="2" color="white" backgroundColor="#607D8B"/>
            <CalcButton onPress={() =>{this.onDigitPress('3')}} title="3" color="white" backgroundColor="#607D8B"/>
            <CalcButton onPress={() =>{this.onBinaryOperatorPress(this.oc.AdditionOperator)}} title="+" color="white" backgroundColor="#DCA394"/>
            </View>

            <View style={styles.buttonRow}>
            <CalcButton onPress={() =>{this.onDigitPress('0')}} title="0" color="white" backgroundColor="#607D8B" style={{flex: 2}} />
            <CalcButton onPress={() =>{this.onDigitPress('.')}} title="." color="white" backgroundColor="#607D88"/>
            <CalcButton onPress={this.onEqualsPress} title="=" color="white" backgroundColor="#DCA394"/>
            </View>
            </View>
            </View>
        )
    }

    renderLandscape(){
        return(
            <View style={{flex:1}}>
                <Text style={{color: 'white', justifyContent: 'center', alignItems: 'center'}}>LandScape Mode</Text>
            </View>
        )
    }

    render(){
        var view = (this.state.orientation == 'portrait')
        ? this.renderPortrait()
        : this.renderLandscape();
        return(
            <View style={styles.container}>
            {view}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop:30,
        backgroundColor: '#000000'
    },
    buttonContainer:{
        paddingBottom:20
    },
    buttonRow:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    displayContainer:{
        flex: 1,
        justifyContent: 'flex-end'
    }
});