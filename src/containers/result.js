import { connect } from 'react-redux';
import Result from './../components/result';

const mapStoreToProps = (store) => {
    return {
        eid: store.eid,
        description: store.description,
        family: store.family,
        correctCount: store.correctCount,
        wrongCount: store.wrongCount,
        totalCount: store.totalCount,
        finalResult: store.finalResult,
        userName: store.userName
    }
}

const mapDispatchToProps = {};

export default connect(mapStoreToProps, mapDispatchToProps)(Result);