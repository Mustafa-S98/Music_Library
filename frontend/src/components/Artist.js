import React from 'react';

import { Table } from 'antd';

const Artist = (props) => {
    return (
        <div>
            <Table columns={props.col} dataSource={props.data} />
        </div>

    )
}

export default Artist;