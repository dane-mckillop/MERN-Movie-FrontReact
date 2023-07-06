import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

/**
 * Dropdown menu for selecting the year a movie was produced. 1990 to present.
 * 
 * @param {Object} props year, setYear, years
 * @returns drop-down component which allows the user to select the year for their search.
 * @usedIn Nav
 */
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