const initialState = {
    eid: '',
    family: '',
    description: '',
    correctCount: 0,
    wrongCount: 0,
    totalCount: 0,
    finalResult: []
}

const rootReducer = (state = initialState, action) => {
    if (action.type === 'RESULT_ACQUIRED') {
        const newState = {
            eid: action.payload.eid,
            description: action.payload.description,
            family: action.payload.family,
            correctCount: action.payload.correctCount,
            wrongCount: action.payload.wrongCount,
            totalCount: action.payload.totalCount,
            finalResult: action.payload.finalResult,
            userName: action.payload.userName
        }
        return newState;
    } else {
        return state;
    }
}

export default rootReducer;