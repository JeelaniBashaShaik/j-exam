import React from 'react';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Config from './../config';
const Results = () => {
    const [results, setResults] = React.useState([]);
    React.useEffect(() => {
        axios.get(`${Config.baseUrl}/result/fetchAllResults`).then(response => {
            if (response.data.result === 'success') {
                setResults(response.data.payload);
            }
        })
    }, [])
    return (
        <div style={{ margin: '20px' }}>
            {
                results.length > 0 && <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', gridGap: '20px' }}>
                    {
                        results.map(result => {
                            return (
                                <Paper style={{ padding: '20px' }} key={result.eid + result.userName}>
                                    <div>Name:{result.userName}</div><div>Exam Id: {result.eid}</div><div>Percentage:{(result.correctCount / result.totalCount) * 100}</div>
                                </Paper>
                            )
                        })
                    }
                </div>

            }
        </div >
    )
}

export default Results;