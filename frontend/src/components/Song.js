import React from 'react';

import { Table } from 'antd';

const Song = (props) => {
    return (
        <div>
            <Table columns={props.col} dataSource={props.data} />
        </div>

    )
}

export default Song;