import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export default function YearSelector(props) {
    const { year, setYear, years } = props;

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="dropdown">
            <DropdownToggle caret> {year === "" ? "All" : year} </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => setYear("")}>All</DropdownItem>
                {years.map((option, index) => (
                    <DropdownItem key={index} onClick={() => setYear(option)}>{option}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}