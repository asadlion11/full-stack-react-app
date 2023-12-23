import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Nav = styled.nav`
    height: 83px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2px;
`

export const Logo = styled(Link)`
    font-size: 35px;
    color: #3f45d1;
    text-decoration: none;
    font-weight: 700;
    cursor: pointer;
`

export const Menu = styled.ul`
    display: flex;
`

export const MenuItem = styled(Link)`
    margin: 10px;
    text-decoration: none;
    color: #3f45d1;
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
`