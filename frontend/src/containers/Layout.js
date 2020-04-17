import React from 'react';
import { Layout, Menu } from 'antd';

const { Content, Footer, Sider } = Layout;

const CustomLayout = (props) => {
    return(
            <Layout>
                <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                }}
                onCollapse={(collapsed, type) => {
                }}
                >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="home">
                    <span className="nav-text"><a href="http://localhost:3000/">Home</a></span>
                    </Menu.Item>
                    <Menu.Item key="add_artist">
                    <span className="nav-text"><a href="http://localhost:3000/add_artist/">Add Artist</a></span>
                    </Menu.Item>
                    <Menu.Item key="add_song">
                    <span className="nav-text"><a href="http://localhost:3000/add_song/">Add Song</a></span>
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout>

                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Developed by : Mustafa Sadriwala</Footer>
                </Layout>
            </Layout>
    );
}

export default CustomLayout;