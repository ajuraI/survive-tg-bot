const { commands } = require('./constants');
const { 
    startAction, 
    randomAction, 
    clearAction, 
    currentAction,
    updateDataAction,
    randomCatAction,
} = require('./__data__/actions');
const { 
    CMD_START, 
    CMD_RANDOM, 
    CMD_CURRENT,
    CMD_CLEAR,
    CMD_UPDATE,
    CMD_RANDOMCAT,
} = commands;

module.exports = (message) => {
    switch (message.text) {
        case CMD_START: 
            startAction(message);
            break;
        case CMD_RANDOM:  
            randomAction(message);
            break;
        case CMD_CLEAR:
            clearAction(message);
            break;
        case CMD_CURRENT:
            currentAction(message);
            break;
        case CMD_UPDATE:
            updateDataAction(message);
            break;
        case CMD_RANDOMCAT:
            randomCatAction(message);
            break;
        default: {
            break;
        }
    }
}