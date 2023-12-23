import React from 'react'
import {Nav, Logo, Menu, MenuItem } from './Styles.js'

const Header = ()=> {
    return (
            <Nav>
                <Logo to="/">Hacker News</Logo>
                <Menu>
                    <MenuItem to="/posts">Posts</MenuItem>
                    <MenuItem to="/new-post">New Post</MenuItem>
                </Menu>
            </Nav>
    )
}
export default Header