import { connect } from 'react-redux'; 
import QuestionPaper from './../components/questionPaper';
import { resultAcquired } from './../actions';

const mapStoreToProps = (store) => {
    return {}
}

const mapDispatchToProps =  {
    resultAcquired
}

export default connect(mapStoreToProps,mapDispatchToProps)(QuestionPaper);