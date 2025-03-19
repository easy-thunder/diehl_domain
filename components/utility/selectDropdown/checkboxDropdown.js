import { useState } from "react";

export default function CheckboxDropdown({ options = [], selectLabel, onSubmit, clearFilters }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false); 

    const toggleSelection = (option) => {
        setSelectedOptions((prev) =>
            prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
        );
    };
    const clearSelection = () =>{
        setSelectedOptions(()=>[])
        onSubmit([])
    }

    const handleSubmit = () => {
        onSubmit(selectedOptions); 
        setIsOpen(false); 
    };

    return (
        <div className="dropdown-container">
            <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                <span className="dropdown-text">{selectLabel}</span>
                <span className="dropdown-arrow">{isOpen?'^':'⌄'}</span>
            </div>

            {isOpen && selectedOptions.length > 0 && (
                <div className="selected-options">
                    {selectedOptions.map((option, index) => (
                        <span key={index} className="selected-option">
                            {option}
                        </span>
                    ))}
                </div>
            )}

            {isOpen && (
                <div className="dropdown-menu">

                    <div className="checkbox-group">
                        {options.map((option) => (
                            <label key={option} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => toggleSelection(option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                    <button className="submit-btn" onClick={clearSelection}>Clear Selection</button>
                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                </div>
            )}
        </div>
    );
}
